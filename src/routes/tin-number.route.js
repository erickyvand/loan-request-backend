import { Router } from 'express';
import TinNumberController from '../controllers/tin-number.controller';
import { checkTinAndId } from '../middlewares/tin-number.middleware';
import { validateTinNumberBody } from '../validations/tin-number.validation';

const router = Router();

router.post(
	'/',
	validateTinNumberBody,
	checkTinAndId,
	TinNumberController.createTinNumberInfo
);

export default router;
