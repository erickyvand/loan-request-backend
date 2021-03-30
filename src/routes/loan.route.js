import { Router } from 'express';
import Loancontroller from '../controllers/loan.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import {
	checkClientInfo,
	checkPendingLoan,
} from '../middlewares/loan.middleware';
import {
	validateFiles,
	validateLoanBody,
} from '../validations/loan.validation';

const router = Router();

router.post(
	'/',
	authorizationMiddleware,
	validateLoanBody,
	validateFiles,
	checkClientInfo,
	checkPendingLoan,
	Loancontroller.requestLoan
);

export default router;
