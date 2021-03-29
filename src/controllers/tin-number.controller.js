import { CREATED, OK } from 'http-status';
import ResponseService from '../services/response.service';
import TinNumberService from '../services/tin-number.service';

/**
 * TIN Number controller class
 */
class TinNumberController {
	/**
	 * * Create TIN Number information
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object}
	 */
	static async createTinNumberInfo(req, res) {
		const tinInfo = await TinNumberService.createTin(req.body);

		ResponseService.setSuccess(CREATED, 'TIN Info', tinInfo);
		return ResponseService.send(res);
	}

	static async getTinNumberInfo(req, res) {
		ResponseService.setSuccess(OK, 'TIN Info', req.tinInfo);
		return ResponseService.send(res);
	}
}

export default TinNumberController;
