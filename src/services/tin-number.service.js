import models from '../database/models';

const { Tin, Nid } = models;

/**
 * TIN Number service class
 */
class TinNumberService {
	/**
	 * @param  {object} data
	 */
	static createTin(data) {
		return Tin.create(data);
	}

	/**
	 * @param  {object} property
	 */
	static findTinByProperty(property) {
		return Tin.findOne({
			where: property,
			include: {
				model: Nid,
				attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'picture'],
			},
		});
	}
}

export default TinNumberService;
