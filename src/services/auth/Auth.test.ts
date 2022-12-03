import fs from 'fs';
import path from 'path';

import config from '@/config';
import { generateRandomString } from '@/utils';
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
			};
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
				exp: mockAuthDTO.expiresIn,
				iat: expect.any(Number),
			});
			expect(res).toEqual(mockCredentials);
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
