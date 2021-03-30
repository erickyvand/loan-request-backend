import { Op } from 'sequelize';
import {
	CONFLICT,
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	UNAUTHORIZED,
} from 'http-status';
import ResponseService from '../services/response.service';
import TinNumberService from '../services/tin-number.service';
import LoanService from '../services/loan.service';

export const checkClientInfo = async (req, res, next) => {
	try {
		const { inputNumber } = req.body;

		const clientInfo = await TinNumberService.findTinByProperty({
			[Op.or]: { idNumber: inputNumber, tinNumber: inputNumber },
		});

		if (!clientInfo) {
			ResponseService.setError(NOT_FOUND, 'Information not found');
			return ResponseService.send(res);
		}

		req.clientInfo = clientInfo;

		next();
	} catch (error) {
		ResponseService.setError(INTERNAL_SERVER_ERROR, error.message);
		return ResponseService.send(res);
	}
};

export const checkPendingLoan = async (req, res, next) => {
	const { inputNumber } = req.body;
	const request = await LoanService.findLoanByProperty({
		[Op.or]: {
			tinNumber: inputNumber,
			idNumber: inputNumber,
		},
		status: 'pending',
	});

	if (request) {
		ResponseService.setError(
			CONFLICT,
			'This request is in pending status, you can request another loan when this has been approved or rejected'
		);
		return ResponseService.send(res);
	}
	next();
};

export const checkUserRole = async (req, res, next) => {
	if (req.userData.role === 'client') {
		ResponseService.setError(
			UNAUTHORIZED,
			'Unauthorized, You can not access this route'
		);
		return ResponseService.send(res);
	}

	next();
};

export const checkRequestExists = async (req, res, next) => {
	const { requestId } = req.params;
	const request = await LoanService.findLoanByProperty({ id: requestId });

	if (!request) {
		ResponseService.setError(
			NOT_FOUND,
			'The request you are trying to access does not exists'
		);
		return ResponseService.send(res);
	}

	next();
};
