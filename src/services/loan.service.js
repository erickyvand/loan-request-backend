import models from '../database/models';

const { Loan } = models;

class LoanService {
	static createLoan(data) {
		return Loan.create(data);
	}

	static findAllRequests() {
		return Loan.findAll({
			order: [['id', 'DESC']],
		});
	}

	static findLoanByProperty(property) {
		return Loan.findOne({ where: property });
	}

	static updateLoanRequest(requestId, property) {
		return Loan.update(property, { where: requestId, returning: true });
	}

	static findApprovedRequests(property) {
		return Loan.findAll({
			where: property,
			order: [['id', 'DESC']],
		});
	}
}

export default LoanService;
