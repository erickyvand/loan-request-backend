import { handleErrors, registerSchema, loginSchama } from '../utils';

export const validateSignup = (req, res, next) => {
	return handleErrors(registerSchema, req.body, res, next);
};

export const validateLogin = (req, res, next) => {
	return handleErrors(loginSchama, req.body, res, next);
};
