import { CREATED, OK } from 'http-status';
import IdNumberService from '../services/id-number.service';
import ResponseService from '../services/response.service';

/**
 * National ID Number class
 */
class IdNumberController {
	/**
	 * * Identifaction
	 * @param  {object} req
	 * @param  {object} res
	 * @returns {object} object
	 */
	static async createIdentifation(req, res) {
		const { picture } = req.files;
		picture.mv(`./src/public/${picture.name}`);

		const idInfo = await IdNumberService.createIdInfo({
			...req.body,
			picture: picture.name,
		});

		ResponseService.setSuccess(CREATED, 'ID Info', idInfo);
		return ResponseService.send(res);
	}

	static async getIdentication(req, res) {
		ResponseService.setSuccess(OK, 'ID Info', req.idInfo);
		return ResponseService.send(res);
	}
}

export default IdNumberController;
