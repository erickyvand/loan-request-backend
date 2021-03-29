import { handleErrors, tinNumberSchema } from '../utils';

export const validateTinNumberBody = (req, res, next) => {
	return handleErrors(tinNumberSchema, req.body, res, next);
};
