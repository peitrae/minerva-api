import { Service } from 'typedi';

import { Credentials } from './Auth.types';

@Service()
class AuthService {
	constructor() {}

	login(code: string) {
		/**
		 * @TODO Change the mock method to be the actual method
		 */

		return new Promise<Credentials>((resolve) => {
			resolve({
				idToken: 'mockIdToken',
				refreshToken: 'mockRefreshToken',
				expiresIn: 3600,
			});
		});
	}
}

export default AuthService;
