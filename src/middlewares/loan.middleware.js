import { Op } from 'sequelize';
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status';
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
	const request = await LoanService.findLoanByProperty({ status: 'pending' });

	if (request) {
		ResponseService.setError(
			CONFLICT,
			'This request is in pending status, you can request another loan when this has been approved or rejected'
		);
		return ResponseService.send(res);
	}
	next();
};
