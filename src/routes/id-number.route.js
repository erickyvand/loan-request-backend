import { Router } from 'express';
import IdNumberController from '../controllers/id-number.controller';
import { checkIdNumberExists } from '../middlewares/id-number.middleware';
import {
	validateIdNumberBody,
	validateProfilePicture,
} from '../validations/id-number.validation';

const router = Router();

router.post(
	'/',
	validateIdNumberBody,
	validateProfilePicture,
	checkIdNumberExists,
	IdNumberController.createIdentifation
);

export default router;
