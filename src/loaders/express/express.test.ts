import express from 'express';

import loadExpress from './express';
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
	const mockRoutes = routes as jest.MockedFunction<typeof routes>;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should configure express application', () => {
		const mockApp = express();

		loadExpress(mockApp);

		expect(mockApp.get).toHaveBeenCalledWith('/status', expect.any(Function));
		expect(mockApp.use).toHaveBeenCalledWith(config.api.prefix, mockRoutes);
	});
});
