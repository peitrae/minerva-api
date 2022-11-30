import { mockApp, mockRes } from '@mocks/express';

import loadExpress from './express';
import config from '@/config';
import routes from '@/api';

jest.mock('@/api');

describe('loaders/express', () => {
	const mockRoutes = routes as jest.MockedFunction<typeof routes>;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should configure express application', () => {
		loadExpress(mockApp);

		expect(mockApp.get).toHaveBeenCalledWith('/status', expect.any(Function));
		expect(mockRes.status).toHaveBeenCalledWith(200);

		expect(mockApp.use).toHaveBeenCalledWith(config.api.prefix, mockRoutes());
	});
});
