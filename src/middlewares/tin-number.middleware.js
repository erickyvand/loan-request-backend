import { CONFLICT, NOT_FOUND } from 'http-status';
import IdNumberService from '../services/id-number.service';
import ResponseService from '../services/response.service';
import TinNumberService from '../services/tin-number.service';

export const checkTinAndId = async (req, res, next) => {
	const { tinNumber, idNumber } = req.body;
	const idInfo = await IdNumberService.findIdInfoByProperty({ idNumber });
	const tinInfo = await TinNumberService.findTinByProperty({ tinNumber });

	if (!idInfo) {
		ResponseService.setError(NOT_FOUND, 'This ID number does not exists');
		return ResponseService.send(res);
	}

	if (tinInfo) {
		ResponseService.setError(CONFLICT, 'This TIN number alredy exists');
		return ResponseService.send(res);
	}

	next();
};

export const findTinNumberExists = async (req, res, next) => {
	const { tinNumber } = req.params;
	const tinInfo = await TinNumberService.findTinByProperty({ tinNumber });

	if (!tinInfo) {
		ResponseService.setError(
			NOT_FOUND,
			'The provided TIN number does not exists'
		);
		return ResponseService.send(res);
	}
	req.tinInfo = tinInfo;
	next();
};
