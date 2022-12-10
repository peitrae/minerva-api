import fs from 'fs';
import path from 'path';

import config from '@/config';
import { AppError, generateRandomString } from '@/utils';
import { JwtObject } from 'index';
import { AuthService, SpotifyService } from '..';

describe('services/Auth', () => {
	let mockSpotifyService: SpotifyService;
	let mockJwt: JwtObject;

	const mockIdToken = generateRandomString(48);
	const mockAccessToken = generateRandomString(32);

	beforeEach(() => {
		jest.restoreAllMocks();
	});

	describe('login', () => {
		it('should authorize user and returns user credentials', async () => {
			const mockCode = generateRandomString(20);
			const mockAuthDTO = {
				accessToken: mockAccessToken,
				refreshToken: generateRandomString(20),
				expiresIn: 3600,
			};
			const mockCredentials = {
				idToken: mockIdToken,
				refreshToken: mockAuthDTO.refreshToken,
				expiresIn: mockAuthDTO.expiresIn,
			};
			mockSpotifyService = {
				requestAuthorization: jest.fn().mockResolvedValue(mockAuthDTO),
			} as unknown as SpotifyService;
			const mockGenerateIdToken = jest.spyOn(
				AuthService.prototype as any,
				'generateIdToken'
			);
			mockGenerateIdToken.mockReturnValue(mockIdToken);

			const auth = new AuthService(mockSpotifyService, mockJwt);
			const res = await auth.login(mockCode);

			expect(mockSpotifyService.requestAuthorization).toHaveBeenCalledWith(
				mockCode
			);
			expect(mockGenerateIdToken).toHaveBeenCalledWith({
				iss: config.baseURL,
				sub: mockAuthDTO.accessToken,
				aud: config.clientURL,
				exp: expect.any(Number),
				iat: expect.any(Number),
			});
			expect(res).toEqual(mockCredentials);
		});
	});

	describe('verifyIdToken', () => {
		it('should return accessToken if idToken is valid', () => {
			const mockAccessToken = generateRandomString(32);
			mockJwt = {
				...jest.requireActual('jsonwebtoken'),
				verify: jest.fn().mockReturnValue({
					accessToken: mockAccessToken,
				}),
			};

			const mockIdToken = generateRandomString(48);

			const auth = new AuthService(mockSpotifyService, mockJwt);
			const { accessToken } = auth.verifyIdToken(mockIdToken);

			expect(accessToken).toEqual(accessToken);
		});

		it('should throw "TOKEN_IS_EXPIRED" error if idToken is expired', () => {
			const mockIdToken = generateRandomString(48);
			mockJwt = {
				...jest.requireActual('jsonwebtoken'),
				verify: jest.fn(() => {
					throw {
						name: 'TokenExpiredError',
					};
				}),
			};

			const auth = new AuthService(mockSpotifyService, mockJwt);

			expect(() => auth.verifyIdToken(mockIdToken)).toThrowError(
				new AppError({
					name: 'TOKEN_IS_EXPIRED',
					message: 'Authentication token is expired',
					status: 401,
				})
			);
		});

		it('should throw "INVALID_TOKEN" error if idToken is invalid', () => {
			const mockIdToken = generateRandomString(48);
			mockJwt = {
				...jest.requireActual('jsonwebtoken'),
				verify: jest.fn(() => {
					throw {
						name: 'JsonWebTokenError',
						message: 'jwt malformed',
					};
				}),
			};

			const auth = new AuthService(mockSpotifyService, mockJwt);

			expect(() => auth.verifyIdToken(mockIdToken)).toThrowError(
				new AppError({
					name: 'INVALID_TOKEN',
					message: 'Authentication token is invalid',
					status: 401,
				})
			);
		});

		it('should throw another JWT error', () => {
			const mockIdToken = generateRandomString(48);
			const mockError = {
				name: 'JsonWebTokenError',
				message: 'secret or public key must be provided',
			};
			mockJwt = {
				...jest.requireActual('jsonwebtoken'),
				verify: jest.fn(() => {
					throw mockError;
				}),
			};

			const auth = new AuthService(mockSpotifyService, mockJwt);

			expect(() => auth.verifyIdToken(mockIdToken)).toThrow(mockError);
		});
	});

	describe('generateIdToken', () => {
		it('should generate JWT token that will be used as idToken', () => {
			mockJwt = {
				...jest.requireActual('jsonwebtoken'),
				sign: jest.fn().mockReturnValue(mockIdToken),
			};

			const mockPayload = {
				iss: config.baseURL,
				sub: mockAccessToken,
				aud: config.clientURL,
				exp: 3600,
				iat: new Date().getTime(),
			};

			const auth = new AuthService(mockSpotifyService, mockJwt);
			const res = auth['generateIdToken'](mockPayload);

			const privateKeyPath = path.resolve(__dirname, '../../../private.key');
			const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
			const algorithm = config.jwt.algorithm;

			expect(mockJwt.sign).toHaveBeenCalledWith(mockPayload, privateKey, {
				algorithm,
			});
			expect(res).toEqual(mockIdToken);
		});
	});
});
