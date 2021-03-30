import models from '../database/models';

const { User } = models;

class UserService {
	static createUser(data) {
		return User.create(data);
	}

	static findUserByProperty(property) {
		return User.findOne({ where: property });
	}
}

export default UserService;
