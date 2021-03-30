import { Router } from 'express';
import Loancontroller from '../controllers/loan.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import {
	checkClientInfo,
	checkPendingLoan,
	checkUserRole,
	checkRequestExists,
} from '../middlewares/loan.middleware';
import {
	validateFiles,
	validateLoanBody,
	validateRequestParam,
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
router.get(
	'/',
	authorizationMiddleware,
	checkUserRole,
	Loancontroller.getAllRequests
);
router.patch(
	'/:requestId/approve',
	authorizationMiddleware,
	validateRequestParam,
	checkUserRole,
	checkRequestExists,
	Loancontroller.approveRequest
);
router.patch(
	'/:requestId/reject',
	authorizationMiddleware,
	validateRequestParam,
	checkUserRole,
	checkRequestExists,
	Loancontroller.rejectRequest
);
router.get(
	'/approved',
	authorizationMiddleware,
	checkUserRole,
	Loancontroller.getAllApprovedRequests
);

export default router;
