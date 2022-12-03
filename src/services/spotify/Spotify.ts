import { Service } from 'typedi';
import { AuthorizationGranted } from './Spotify.types';

@Service('SpotifyService')
class SpotifyService {
	requestAuthorization(code: string) {
		/**
		 * @TODO Change the mock method to be the actual request access token to Spotify Authorization server
		 */

		return new Promise<AuthorizationGranted>((resolve) => {
			resolve({
				accessToken: 'mockAccessToken',
				refreshToken: 'mockRefreshToken',
				expiresIn: 3600,
			});
		});
	}
}

export default SpotifyService;
