import { CONFLICT, NOT_FOUND } from 'http-status';
import IdNumberService from '../services/id-number.service';
import ResponseService from '../services/response.service';

export const checkIdNumberExists = async (req, res, next) => {
	const { idNumber } = req.body;
	const idInfo = await IdNumberService.findIdInfoByProperty({ idNumber });

	if (idInfo) {
		ResponseService.setError(CONFLICT, 'This ID number already exists');
		return ResponseService.send(res);
	}

	next();
};

export const findIdNumberExists = async (req, res, next) => {
	const { idNumber } = req.params;
	const idInfo = await IdNumberService.findIdInfoByProperty({ idNumber });

	if (!idInfo) {
		ResponseService.setError(
			NOT_FOUND,
			'The provided ID number does not exists'
		);
		return ResponseService.send(res);
	}
	req.idInfo = idInfo;
	next();
};
