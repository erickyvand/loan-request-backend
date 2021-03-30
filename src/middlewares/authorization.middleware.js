import TokenService from '../services/token.service';
import ResponseService from '../services/response.service';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';

/**
 * * Authorize a user to access a protected route
 * @param  {object} req
 * @param  {object} res
 * @param  {object} next
 * @return {object} object
 */
export default (req, res, next) => {
	const bearerHeader = req.headers.authorization;

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		const { name } = TokenService.verifyToken(req.token);

		if (name === 'JsonWebTokenError') {
			ResponseService.setError(UNAUTHORIZED, 'Unauthorized, invalid token');
			return ResponseService.send(res);
		}

		if (name === 'TokenExpiredError') {
			ResponseService.setError(
				UNAUTHORIZED,
				'Unauthorized, Token has expired signin again to get new token'
			);
			return ResponseService.send(res);
		}
		req.userData = TokenService.verifyToken(req.token);
		next();
	} else {
		ResponseService.setError(
			FORBIDDEN,
			'You can not proceed without setting authorization token'
		);
		return ResponseService.send(res);
	}
};
