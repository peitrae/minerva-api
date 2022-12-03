import request from 'supertest';

import config from '@/config';
import { AuthService } from '@/services';
import { generateRandomString } from '@/utils';

const BASE_URL = `${config.baseURL}${config.api.prefix}`;

jest.mock('@/services/auth/Auth');

describe('routes/auth', () => {
	describe('POST /login', () => {
		const mockAuthService = AuthService as jest.MockedClass<typeof AuthService>;

		it('should send idToken, refreshToken, and expiresIn and status of 200', async () => {
			const mockLoginResult = {
				idToken: 'mockIdToken',
				refreshToken: 'mockRefreshToken',
				expiresIn: 3600,
			};

			mockAuthService.mockReturnValue({
				login: jest.fn().mockResolvedValue(mockLoginResult),
			});

			const res = await request(BASE_URL)
				.post(`/v1/auth/login`)
				.send({
					code: generateRandomString(20),
				})
				.expect(200);

			expect(res.body).toEqual(mockLoginResult);
		});

		it('should "Authorization code is not exist" message and status of 400 if code is not exist', async () => {
			const res = await request(BASE_URL).post(`/v1/auth/login`).expect(400);

			expect(res.body).toEqual({
				code: 400,
				message: 'Authorization code is not exist',
				name: 'CODE_IS_EMPTY',
			});
		});
	});
});
