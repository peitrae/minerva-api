import initLoaders from '.';
import injectDependencies from './dependencies/dependencies';
import loadExpress from './express/express';

jest.mock('./dependencies/dependencies');
jest.mock('./express/express', () => jest.fn());

describe('initLoaders', () => {
	const mockLoadExpress = loadExpress as jest.MockedFunction<
		typeof loadExpress
	>;

	const mockInjectDependencies = injectDependencies as jest.MockedFunction<
		typeof injectDependencies
	>;

	it('should initialize all loaders', () => {
		initLoaders();

		expect(mockInjectDependencies).toHaveBeenCalled();
		expect(mockLoadExpress).toHaveBeenCalled();
	});
});
