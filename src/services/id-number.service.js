import models from '../database/models';

const { Nid } = models;

/**
 * National ID service
 */
class IdNumberService {
	/**
	 * @param  {object} data
	 */
	static createIdInfo(data) {
		return Nid.create(data);
	}

	/**
	 * @param  {object} property
	 */
	static findIdInfoByProperty(property) {
		return Nid.findOne({ where: property });
	}
}

export default IdNumberService;
