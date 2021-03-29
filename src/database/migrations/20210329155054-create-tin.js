export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Tins', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		tinNumber: {
			type: Sequelize.BIGINT,
		},
		idNumber: {
			type: Sequelize.INTEGER,
		},
		names: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		phoneNumber: {
			type: Sequelize.STRING,
		},
		companyName: {
			type: Sequelize.STRING,
		},
		address: {
			type: Sequelize.STRING,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Tins');
}