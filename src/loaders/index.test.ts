import initLoaders from '.';
import injectDependencies from './dependencies/dependencies';
import loadExpress from './express/express';
import loadSocketIO from './socketio/socketio';
import { InitLoadersParams } from './index.types';

const mockHttpServer = jest.fn();

jest.mock('http', () => ({
	createServer: jest.fn(() => mockHttpServer),
}));
jest.mock('./dependencies/dependencies');
jest.mock('./express/express', () => jest.fn());
jest.mock('./socketio/socketio');

describe('initLoaders', () => {
	const mockParams = {
		app: jest.fn(),
		io: jest.fn(),
	} as unknown as InitLoadersParams;

	it('should initialize all loaders', () => {
		initLoaders(mockParams);

		expect(injectDependencies).toHaveBeenCalled();
		expect(loadExpress).toHaveBeenCalledWith(mockParams.app);
		expect(loadSocketIO).toHaveBeenCalledWith(mockParams.io);
	});
});
