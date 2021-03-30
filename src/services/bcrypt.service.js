import bcrypt from 'bcrypt';

/**
 * Bcrypt Service class
 */
class BcryptService {
	/**
	 * * Hash a password.
	 * @param  {string} password
	 * @returns {object}
	 */
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	/**
	 * * Compare passwords.
	 * @param  {string} plainPassword
	 * @param  {string} hashPassword
	 * @returns {object}
	 */
	static comparePassword(plainPassword, hashPassword) {
		return bcrypt.compareSync(plainPassword, hashPassword);
	}
}

export default BcryptService;
