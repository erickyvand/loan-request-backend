import { Router } from 'express';
import TinNumberController from '../controllers/tin-number.controller';
import {
	checkTinAndId,
	findTinNumberExists,
} from '../middlewares/tin-number.middleware';
import {
	validateTinNumberBody,
	validateTinNumberParam,
} from '../validations/tin-number.validation';

const router = Router();

router.post(
	'/',
	validateTinNumberBody,
	checkTinAndId,
	TinNumberController.createTinNumberInfo
);
router.get(
	'/:tinNumber',
	validateTinNumberParam,
	findTinNumberExists,
	TinNumberController.getTinNumberInfo
);

export default router;
