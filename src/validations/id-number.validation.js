import { BAD_REQUEST } from 'http-status';
import ResponseService from '../services/response.service';
import { handleErrors, idNumberschema, idParamSchema } from '../utils';

export const validateIdNumberBody = (req, res, next) => {
	return handleErrors(idNumberschema, req.body, res, next);
};

export const validateProfilePicture = (req, res, next) => {
	if (!req.files) {
		ResponseService.setError(BAD_REQUEST, 'Please select a picture');
		return ResponseService.send(res);
	}

	const { picture } = req.files;
	
	if (picture === undefined) {
		ResponseService.setError(BAD_REQUEST, 'Check if the field name is picture');
		return ResponseService.send(res);
	}

	if (
		picture.mimetype !== 'image/jpg' &&
		picture.mimetype !== 'image/jpeg' &&
		picture.mimetype !== 'image/png'
	) {
		ResponseService.setError(
			BAD_REQUEST,
			'Only jpg, jpeg, png files are allowed'
		);
		return ResponseService.send(res);
	}

	if (picture.size > 5000000) {
		ResponseService.setError(BAD_REQUEST, 'Picture size must not exceed 5MB');
		return ResponseService.send(res);
	}

	next();
};

export const validateIdNumberParam = (req, res, next) => {
	return handleErrors(idParamSchema, req.params, res,next)
}
