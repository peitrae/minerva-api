import injectDependencies from './dependencies/dependencies';
import loadExpress from './express/express';

const initLoaders = () => {
	/**
	 * Inject all metadata dependencies
	 */
	injectDependencies();

	/**
	 * Load express
	 */
	const expressApp = loadExpress();

	return { expressApp };
};

export default initLoaders;
