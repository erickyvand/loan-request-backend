import { CREATED, OK } from 'http-status';
import LoanService from '../services/loan.service';
import MailService from '../services/mail.service';
import ResponseService from '../services/response.service';
import mailGenerator from '../utils/mail-generator';

class Loancontroller {
	static async requestLoan(req, res) {
		const { file } = req.files;
		file.mv(`./src/public/${file.name}`);

		const {
			idNumber,
			tinNumber,
			email,
			companyName,
			address,
			Nid,
		} = req.clientInfo;
		const { firstName, lastName, phoneNumber, picture } = Nid;

		const clientInfo = await LoanService.createLoan({
			userId: req.userData.id,
			idNumber,
			tinNumber,
			firstName,
			lastName,
			email,
			phoneNumber,
			companyName,
			address,
			picture,
		});

		ResponseService.setSuccess(
			CREATED,
			'Loan request successfully created',
			clientInfo
		);
		return ResponseService.send(res);
	}

	static async approveRequest(req, res) {
		const { requestId } = req.params;
		await LoanService.updateLoanRequest(
			{ id: requestId },
			{ status: 'approved' }
		);

		const request = await LoanService.findLoanByProperty({ id: requestId });

		const email = {
			body: {
				name: `${request.firstName} ${request.lastName}`,
				intro: 'This is to confirm that your loan request has been approved.',
			},
		};
		// Send email notification
		const emailBody = mailGenerator.generate(email);
		MailService.sendEmail(request.email, 'Approval', emailBody);

		ResponseService.setSuccess(OK, 'Approved request', request);
		return ResponseService.send(res);
	}

	static async rejectRequest(req, res) {
		const { requestId } = req.params;
		await LoanService.updateLoanRequest(
			{ id: requestId },
			{ status: 'rejected' }
		);

		const request = await LoanService.findLoanByProperty({ id: requestId });

		ResponseService.setSuccess(OK, 'Rejected request', request);
		return ResponseService.send(res);
	}

	static async getAllRequests(req, res) {
		const requests = await LoanService.findAllRequests();
		ResponseService.setSuccess(OK, 'All loan requests', requests);
		return ResponseService.send(res);
	}

	static async getAllApprovedRequests(req, res) {
		const requests = await LoanService.findApprovedRequests({
			status: 'approved',
		});
		ResponseService.setSuccess(OK, 'All approved loan requests', requests);
		return ResponseService.send(res);
	}
}

export default Loancontroller;
