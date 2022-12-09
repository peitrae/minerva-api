import { Inject, Service } from 'typedi';

import config from '@/config';
import { AppJWTPayload, Credentials } from './Auth.types';
import { SpotifyService } from '..';
import { JwtObject } from 'index';
import { generateRandomString } from '@/utils';

@Service()
class AuthService {
	constructor(
		@Inject('SpotifyService') private spotify: SpotifyService,
		@Inject('jwt') private jwt: JwtObject
	) {}

	public async login(code: string): Promise<Credentials> {
		const authDTO = await this.spotify.requestAuthorization(code);
		const { accessToken, refreshToken, expiresIn } = authDTO;

		const idToken = this.generateIdToken({
			iss: config.baseURL,
			sub: accessToken,
			aud: config.clientURL,
			exp: expiresIn,
			iat: new Date().getTime(),
		});

		return {
			idToken,
			refreshToken,
			expiresIn,
		};
	}

	public verifyIdToken(idToken: string) {
    /**
     * @TODO Change to actual method
     */

		const accessToken = generateRandomString(20);

		return { accessToken };
	}

	/**
	 * Return JWT of idToken.
	 */
	private generateIdToken(payload: AppJWTPayload) {
		const { privateKey, algorithm } = config.jwt;

		return this.jwt.sign(payload, privateKey, {
			algorithm,
		});
	}
}

export default AuthService;
