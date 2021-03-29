import { CONFLICT } from 'http-status';
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
