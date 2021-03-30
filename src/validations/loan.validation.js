import { BAD_REQUEST } from 'http-status';
import ResponseService from '../services/response.service';
import { handleErrors, loanSchema } from '../utils';

export const validateLoanBody = (req, res, next) => {
	return handleErrors(loanSchema, req.body, res, next);
};

export const validateFiles = (req, res, next) => {
	if (!req.files) {
		ResponseService.setError(BAD_REQUEST, 'Please select a file');
		return ResponseService.send(res);
	}

	const { file } = req.files;

	if (file === undefined) {
		ResponseService.setError(400, 'Check if the field name is file');
		return ResponseService.send(res);
	}

	if (file.mimetype !== 'application/pdf') {
		ResponseService.setError(BAD_REQUEST, 'Only pdf files are allowed');
		return ResponseService.send(res);
	}

	if (file.size > 2000000) {
		ResponseService.setError(BAD_REQUEST, 'file size must not exceed 2MB');
		return ResponseService.send(res);
	}

	next();
};
