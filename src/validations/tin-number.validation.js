import { handleErrors, tinNumberSchema, tinParamSchema } from '../utils';

export const validateTinNumberBody = (req, res, next) => {
	return handleErrors(tinNumberSchema, req.body, res, next);
};

export const validateTinNumberParam = (req, res, next) => {
	return handleErrors(tinParamSchema, req.params, res, next);
};
