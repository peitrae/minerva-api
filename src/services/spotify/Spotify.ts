import config from '@/config';
import { AppError } from '@/utils';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Inject, Service } from 'typedi';

import { AuthorizationGranted } from './Spotify.types';

@Service('SpotifyService')
class SpotifyService {
	constructor(@Inject('spotifyClient') private httpClient: AxiosInstance) {}

	/**
	 * Exchange the authorization code for an Access Token.
	 */
	async requestAuthorization(code: string) {
		const { clientId, clientSecret, redirectURI } = config.spotify;

		const client = Buffer.from(`${clientId}:${clientSecret}`).toString(
			'base64'
		);

		const options = {
			headers: {
				Authorization: `Basic ${client}`,
				'content-type': 'application/x-www-form-urlencoded',
			},
			params: {
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirectURI,
			},
		};

		try {
			const res: AxiosResponse<AuthorizationGranted> =
				await this.httpClient.post('/token', null, options);
			const { access_token, refresh_token, expires_in } = res.data;

			return {
				accessToken: access_token,
				refreshToken: refresh_token,
				expiresIn: expires_in,
			};
		} catch (err) {
			if (err.response && err.response.data) {
				const { error, error_description } = err.response.data;

				throw new AppError({
					status: err.response.status,
					name: error,
					message: error_description,
				});
			}

			throw err;
		}
	}
}

export default SpotifyService;
