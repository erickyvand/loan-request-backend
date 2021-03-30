import models from '../database/models';

const { Loan } = models;

class LoanService {
	static createLoan(data) {
		return Loan.create(data);
	}

	static findLoanByProperty(property) {
		return Loan.findOne({ where: property });
	}
}

export default LoanService;
