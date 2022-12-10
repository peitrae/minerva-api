import { Inject, Service } from 'typedi';

import config from '@/config';
import { AppJWTPayload, Credentials } from './Auth.types';
import { SpotifyService } from '..';
import { JwtObject } from 'index';
import { AppJwtPayload } from '@/types/jwt.types';
import { AppError } from '@/utils';

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
			exp: new Date().getTime() + (expiresIn * 60),
			iat: new Date().getTime(),
		});

		return {
			idToken,
			refreshToken,
			expiresIn,
		};
	}

	public verifyIdToken(idToken: string) {
		try {
			const { accessToken }: AppJwtPayload = this.jwt.verify(
				idToken,
				config.jwt.publicKey
			);

			return { accessToken };
		} catch (err) {
			if (err.name === 'TokenExpiredError') {
				throw new AppError({
					name: 'TOKEN_IS_EXPIRED',
					message: 'Authentication token is expired',
					status: 401,
				});
			} else if (err.name === 'JsonWebTokenError' && err.message === 'jwt malformed') {
				throw new AppError({
					name: 'INVALID_TOKEN',
					message: 'Authentication token is invalid',
					status: 401,
				});
			}

			throw err;
		}
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
