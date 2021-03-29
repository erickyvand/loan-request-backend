import { Router } from 'express';
import IdNumberController from '../controllers/id-number.controller';
import {
	checkIdNumberExists,
	findIdNumberExists,
} from '../middlewares/id-number.middleware';
import {
	validateIdNumberBody,
	validateIdNumberParam,
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
router.get(
	'/:idNumber',
	validateIdNumberParam,
	findIdNumberExists,
	IdNumberController.getIdentication
);

export default router;
