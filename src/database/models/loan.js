'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Loan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Loan.init(
		{
			userId: DataTypes.INTEGER,
			idNumber: DataTypes.BIGINT,
			tinNumber: DataTypes.BIGINT,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			companyName: DataTypes.STRING,
			address: DataTypes.STRING,
			picture: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Loan',
		}
	);
	return Loan;
};
