import { NextFunction, Request, Response } from 'express';
import loadExpress, { handleExpressError } from './express';
import config from '@/config';
import routes from '@/api';

jest.mock('@/api', () => jest.fn());
jest.mock('express', () => {
	const express = jest.fn().mockReturnValue({
		get: jest.fn(),
		use: jest.fn(),
	}) as any;

	express.json = jest.fn();

	return express;
});

describe('loaders/express', () => {
	const mockRequest = {} as unknown as Request;
	const mockResponse = {
		send: jest.fn().mockReturnThis(),
		status: jest.fn().mockReturnThis(),
		json: jest.fn(),
	} as unknown as Response;
	const mockNextFn = jest.fn() as NextFunction;

	describe('handleExpressError', () => {
		it('should pass controll to the next of middleware function', () => {
			const mockError = undefined;

			handleExpressError(mockError, mockRequest, mockResponse, mockNextFn);

			expect(mockNextFn).toHaveBeenCalled();
		});

		it('should immediately send error', () => {
			const mockError = {
				errors: {
					name: 'UNAUTHORIZED',
					status: 400,
					message: 'Unauthorized',
				},
			};

			handleExpressError(mockError, mockRequest, mockResponse, mockNextFn);

			expect(mockResponse.status).toHaveBeenCalledWith(mockError.errors.status);
			expect(mockResponse.json).toHaveBeenCalledWith(mockError);
		});

		it('should adjust error from response and send it', () => {
			const mockError = {
				response: {
					status: 400,
					statusText: 'Unauthorized',
				},
			};

			handleExpressError(mockError, mockRequest, mockResponse, mockNextFn);

			expect(mockResponse.status).toHaveBeenCalledWith(
				mockError.response.status
			);
			expect(mockResponse.json).toHaveBeenCalledWith(
				expect.objectContaining({
					errors: {
						status: 400,
						name: 'UNAUTHORIZED',
						message: 'Unauthorized',
					},
				})
			);
		});

		it('should handle another error by send INTERNAL_SERVER_ERROR', () => {
			const mockError = {};

			handleExpressError(mockError, mockRequest, mockResponse, mockNextFn);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith(
				expect.objectContaining({
					errors: {
						status: 500,
						name: 'INTERNAL_SERVER_ERROR',
						message: 'Internal Server Error',
					},
				})
			);
		});
	});

	describe('loadExpress', () => {
		const mockRoutes = routes as jest.MockedFunction<typeof routes>;

		it('should configure express application', () => {
			const app = loadExpress();

			expect(app.get).toHaveBeenCalledWith('/status', expect.any(Function));
			expect(app.use).toHaveBeenCalledWith(config.api.prefix, mockRoutes);
      expect(app.use).toHaveBeenCalledWith(handleExpressError);
		});
	});
});
