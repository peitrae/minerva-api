import { AuthService } from '@/services';
import { AppAuthenticatedSocket, AppSocket } from '@/types/socket.types';
import { AppError, generateRandomString } from '@/utils';
import Container from 'typedi';
import { authenticate } from '..';

jest.mock('@/services/auth/Auth');

describe('middlewares/authenticate', () => {
	const mockAuthService = AuthService as any;

	it('should call next function to continue connection', () => {
		const mockIdToken = generateRandomString(48);
		const mockAccessToken = generateRandomString(48);
		const mockNextFn = jest.fn();

		const mockSocket = {
			handshake: {
				headers: {
					authentication: mockIdToken,
				},
			},
		} as unknown as AppAuthenticatedSocket;
		mockAuthService.verifyIdToken = jest.fn().mockReturnValue({
			accessToken: mockAccessToken,
		});

		Container.set(AuthService, mockAuthService);

		authenticate(mockSocket, mockNextFn);

		expect(mockAuthService.verifyIdToken).toHaveBeenCalledWith(mockIdToken);
		expect(mockNextFn).toHaveBeenCalledWith();
		expect(mockSocket.user.accessToken).toEqual(mockAccessToken);
	});

	it('should call next function with "TOKEN_IS_EMPTY" error if idToken is not exist in headers', () => {
		const mockNextFn = jest.fn();
		const mockSocket = {
			handshake: {
				headers: {
					authentication: undefined,
				},
			},
		} as unknown as AppSocket;
		const mockError = new AppError({
			message: 'Authentication token is empty',
			name: 'TOKEN_IS_EMPTY',
			status: 401,
		});

		authenticate(mockSocket, mockNextFn);

		expect(mockNextFn).toHaveBeenCalledWith(mockError);
	});

	it('should call next function with "TOKEN_IS_INVALID" errorif idToken verification is invalid', () => {
		const mockIdToken = generateRandomString(48);
		const mockNextFn = jest.fn();
		const mockError = new AppError({
			message: 'Authentication token is invalid',
			name: 'TOKEN_IS_INVALID',
			status: 401,
		});

		const mockSocket = {
			handshake: {
				headers: {
					authentication: mockIdToken,
				},
			},
		} as unknown as AppSocket;
		mockAuthService.verifyIdToken = jest.fn(() => {
			throw mockError;
		});

		Container.set(AuthService, mockAuthService);

		authenticate(mockSocket, mockNextFn);

		expect(mockNextFn).toHaveBeenCalledWith(mockError);
	});
});
