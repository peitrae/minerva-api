import { AppError, generateRandomString } from '@/utils';
import { AxiosInstance } from 'axios';
import { SpotifyService } from '..';

describe('Spotify', () => {
	describe('requestAuthorization', () => {
		const mockCode = generateRandomString(48);
		const mockHttpClient = {
			post: jest.fn(),
		};

		it('should returns accessToken, refreshToken, and expiresIn', async () => {
			const mockResponse = {
				data: {
					access_token: generateRandomString(24),
					refresh_token: generateRandomString(24),
					expires_in: 3600,
				},
			};

			mockHttpClient.post.mockResolvedValue(mockResponse);

			const spotify = new SpotifyService(
				mockHttpClient as unknown as AxiosInstance
			);

			const res = await spotify.requestAuthorization(mockCode);

			expect(res).toEqual({
				accessToken: mockResponse.data.access_token,
				refreshToken: mockResponse.data.refresh_token,
				expiresIn: mockResponse.data.expires_in,
			});
		});

		it('should throw "Authorization code expired" and status 400', async () => {
			mockHttpClient.post.mockRejectedValue({
				response: {
					status: 400,
					data: {
						error: 'Invalid Grant',
						error_description: 'Authorization code expired',
					},
				},
			});

			const spotify = new SpotifyService(
				mockHttpClient as unknown as AxiosInstance
			);

			await expect(spotify.requestAuthorization(mockCode)).rejects.toThrowError(
				new AppError({
					status: 400,
					name: 'INVALID_GRANT',
					message: 'Authorization code expired',
				})
			);
		});

		it('should throw "Invalid authorization code" and status 400', async () => {
			mockHttpClient.post.mockRejectedValue({
				response: {
					status: 400,
					data: {
						error: 'Invalid Grant',
						error_description: 'Invalid authorization code',
					},
				},
			});

			const spotify = new SpotifyService(
				mockHttpClient as unknown as AxiosInstance
			);

			await expect(spotify.requestAuthorization('')).rejects.toThrowError(
				new AppError({
					status: 400,
					name: 'INVALID_GRANT',
					message: 'Invalid authorization code',
				})
			);
		});

		it('should throw another error', async () => {
			const mockError = {
				code: 'ENOTFOUND',
				name: 'Error',
				message: 'getaddrinfo ENOTFOUND accounts.spotify.com',
			};

			mockHttpClient.post.mockRejectedValue(mockError);

			const spotify = new SpotifyService(
				mockHttpClient as unknown as AxiosInstance
			);

			try {
				await spotify.requestAuthorization(mockCode);
			} catch (err) {
				expect(err).toMatchObject(mockError);
			}
		});
	});
});
