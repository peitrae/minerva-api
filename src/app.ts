import * as http from 'http';
import 'module-alias/register';
import 'reflect-metadata';

import config from './config';
import initLoaders from './loaders';

const startServer = () => {
	/**
	 * Initialize all loaders
	 */
	const { expressApp } = initLoaders();

	/**
	 * Initialize server
	 */
	const server = http.createServer(expressApp);

	server.listen(config.port, () => {
		console.log(`Server listening on port: ${config.port}`);
	});

	return { expressApp, server };
};

const { expressApp, server } = startServer();

export { expressApp, server };
