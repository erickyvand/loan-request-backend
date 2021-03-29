const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Tin.belongsTo(models.Nid, {
				foreignKey: 'idNumber',
				targetKey: 'idNumber',
			});
		}
	}
	Tin.init(
		{
			tinNumber: DataTypes.BIGINT,
			idNumber: DataTypes.BIGINT,
			email: DataTypes.STRING,
			companyName: DataTypes.STRING,
			address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Tin',
		}
	);
	return Tin;
};
