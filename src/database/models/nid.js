const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Nid extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Nid.init(
		{
			idNumber: DataTypes.BIGINT,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			dob: DataTypes.DATE,
			birthPlace: DataTypes.STRING,
			picture: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Nid',
		}
	);
	return Nid;
};
