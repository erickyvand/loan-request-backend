import Joi from 'joi';
import joiPhone from 'joi-phone-number';
import joiDate from '@hapi/joi-date';
import { BAD_REQUEST } from 'http-status';
import ResponseService from '../services/response.service';

const customJoi = Joi.extend(joiPhone);
const JoiDate = Joi.extend(joiDate);

/**
 * * Handle Errors function
 * @param  {object} schema
 * @param  {object} req
 * @param  {object} res
 * @param  {object} next
 * @returns {object} object
 */
export const handleErrors = (schema, req, res, next) => {
	const { error } = schema.validate(req);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(BAD_REQUEST, errors);
		return ResponseService.send(res);
	}

	next();
};

// National ID validation schema
export const idNumberschema = Joi.object({
	idNumber: Joi.string()
		.regex(/^[0-9]{16}$/)
		.required()
		.messages({
			'string.pattern.base': 'Id Number must be a number with 16 digit',
			'any.required': 'Id Number is required',
			'string.empty': 'Id Number is not allowed to be empty',
		}),
	firstName: Joi.string().trim().min(2).required().messages({
		'any.required': 'First Name is required',
		'string.empty': 'First Name is not allowed to be empty',
		'string.min': 'First Name length must be at least 2 characters long',
	}),
	lastName: Joi.string().trim().min(2).required().messages({
		'any.required': 'Last Name is required',
		'string.empty': 'Last Name is not allowed to be empty',
		'string.min': 'Last Name length must be at least 2 characters long',
	}),
	phoneNumber: customJoi
		.string()
		.phoneNumber({ format: 'international', strict: true })
		.required()
		.messages({
			'any.required': 'Phone Number is required',
			'string.empty': 'Phone Number is not allowed to be empty',
			'phoneNumber.invalid': 'Phone Number did not seem to be a phone number',
		}),
	dob: JoiDate.date()
		.less('2006-01-01')
		.utc()
		.format('YYYY-MM-DD')
		.required()
		.messages({
			'any.required': 'Date of Birth is required',
			'date.less': 'Date of Birth must be less than 2006-01-01',
			'date.format': 'Date of Birth must have format YYYY-MM-DD',
		}),
	birthPlace: Joi.string().trim().min(4).required().messages({
		'any.required': 'Place of birth is required',
		'string.empty': 'Place of birth is not allowed to be empty',
		'string.min': 'Place of birth length must be at least 4 characters long',
	}),
	picture: Joi.string(),
}).options({ abortEarly: false });

// TIN number schema
export const tinNumberSchema = Joi.object({
	tinNumber: Joi.string()
		.regex(/^[0-9]{9}$/)
		.required()
		.messages({
			'string.pattern.base': 'TIN Number must be a number with 9 digit',
			'any.required': 'TIN Number is required',
			'string.empty': 'TIN Number is not allowed to be empty',
		}),
	idNumber: Joi.string()
		.regex(/^[0-9]{16}$/)
		.required()
		.messages({
			'string.pattern.base': 'Id Number must be a number with 16 digit',
			'any.required': 'Id Number is required',
			'string.empty': 'Id Number is not allowed to be empty',
		}),
	email: Joi.string().trim().email().required().messages({
		'any.required': 'Email is required',
		'string.email': 'Email must be a valid email',
		'string.empty': 'Email is not allowed to be empty',
	}),
	companyName: Joi.string().trim().min(4).required().messages({
		'any.required': 'Company Name is required',
		'string.empty': 'Company Name is not allowed to be empty',
		'string.min': 'Company Name length must be at least 4 characters long',
	}),
	address: Joi.string().trim().min(4).required().messages({
		'any.required': 'Address is required',
		'string.empty': 'Address is not allowed to be empty',
		'string.min': 'Address length must be at least 4 characters long',
	}),
}).options({ abortEarly: false });

// ID number param schema
export const idParamSchema = Joi.object({
	idNumber: Joi.string()
		.regex(/^[0-9]{1,}$/)
		.required()
		.messages({
			'string.pattern.base': 'Id Number must be a number'
		}),
});

// TIN number param schema
export const tinParamSchema = Joi.object({
	tinNumber: Joi.string()
		.regex(/^[0-9]{1,}$/)
		.required()
		.messages({
			'string.pattern.base': 'TIN Number must be a number'
		}),
});