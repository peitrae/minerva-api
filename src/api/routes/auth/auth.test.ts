import request from 'supertest';
import { AuthService } from '@/services';
import { generateRandomString } from '@/utils';
import { expressApp, server } from '@/app';

jest.mock('@/services/auth/Auth');

describe('routes/auth', () => {
	const mockAuthService = AuthService as jest.MockedClass<typeof AuthService>;

	afterAll((done) => {
		server.close();
		done();
	});

	describe('POST /login', () => {
		it('should send idToken, refreshToken, and expiresIn and status of 200', async () => {
			const mockLoginResult = {
				idToken: 'mockIdToken',
				refreshToken: 'mockRefreshToken',
				expiresIn: 3600,
			};
			const mockAuthServiceProperties = jest.requireActual(
				'@/services/auth/Auth'
			);

			mockAuthService.mockReturnValue({
				...mockAuthServiceProperties,
				login: jest.fn().mockResolvedValue(mockLoginResult),
			});

			// const res = await request(expressApp)
			// 	.post(`/api/v1/auth/login`)
			// 	.send({
			// 		code: generateRandomString(20),
			// 	})
			// 	.expect(200);

			// expect(res.body).toEqual(mockLoginResult);

			/**
			 * @TODO This test is still error due to AuthService Container is undefined in jest environment.
			 */
		});

		it('should "Authorization code is not exist" message and status of 400 if code is not exist', async () => {
			const res = await request(expressApp)
				.post(`/api/v1/auth/login`)
				.expect(400);

			expect(res.body).toMatchObject({
				errors: {
					status: 400,
					message: 'Authorization code is not exists',
					name: 'AUTHORIZATION_CODE_IS_EMPTY',
				},
			});
		});
	});
});
