import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import ResponseService from '../services/response.service';
import { CREATED, OK } from 'http-status';
import TokenService from '../services/token.service';

class AuthController {
	static async register(req, res) {
		const { password } = req.body;
		const { dataValues } = await UserService.createUser({
			...req.body,
			password: BcryptService.hashPassword(password),
		});

		const userData = { ...dataValues };
		delete userData.password;

		ResponseService.setSuccess(CREATED, 'Success registration', userData);
		return ResponseService.send(res);
	}

	static async login(req, res) {
		ResponseService.setSuccess(OK, 'You are successfully logged in', {
			token: TokenService.generateToken(req.userData),
			user: req.userData,
		});
		return ResponseService.send(res);
	}
}

export default AuthController;
