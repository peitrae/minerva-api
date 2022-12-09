import injectDependencies from './dependencies/dependencies';
import loadExpress from './express/express';
import { InitLoadersParams } from './index.types';
import loadSocketIO from './socketio/socketio';


const initLoaders = ({ app, io }: InitLoadersParams) => {
	/**
	 * Inject all metadata dependencies
	 */
	injectDependencies();

	/**
	 * Load express
	 */
	loadExpress(app);

	/**
	 * Load Socket IO
	 */
	loadSocketIO(io);
};

export default initLoaders;
