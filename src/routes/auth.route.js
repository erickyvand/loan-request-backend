import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import {
	checkUserCredentials,
	checkUserExists,
} from '../middlewares/user.middleware';
import { validateLogin, validateSignup } from '../validations/user.validation';

const router = Router();

router.post(
	'/register',
	validateSignup,
	checkUserExists,
	AuthController.register
);
router.post(
	'/login',
	validateLogin,
	checkUserCredentials,
	AuthController.login
);

export default router;
