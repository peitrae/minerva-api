import { Application } from 'express';

import initLoaders from '.';
import loadExpress from './express/express';

jest.mock('./express/express', () => jest.fn());

describe('initLoaders', () => {
	const mockLoadExpress = loadExpress as jest.MockedFunction<
		typeof loadExpress
	>;

	it('should initialize all loaders', () => {
		const mockExpressApp = {} as Application;

		initLoaders({ expressApp: mockExpressApp });

		expect(mockLoadExpress).toHaveBeenCalledWith(mockExpressApp);
	});
});
