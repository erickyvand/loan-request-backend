import { CREATED } from 'http-status';
import LoanService from '../services/loan.service';
import ResponseService from '../services/response.service';

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
			'Load request successfully created',
			clientInfo
		);
		return ResponseService.send(res);
	}
}

export default Loancontroller;
