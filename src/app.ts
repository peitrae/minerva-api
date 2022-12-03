import express from 'express';
import * as http from 'http';
import 'module-alias/register';
import 'reflect-metadata';

import config from './config';
import initLoaders from './loaders';

const startServer = () => {
	/**
	 * Initialize server
	 */
	const app = express();
	const server = http.createServer(app);

	/**
	 * Initialize all loaders
	 */
	initLoaders({ expressApp: app });

	server.listen(config.port, () => {
		console.log(`Server listening on port: ${config.port}`);
	});
};

startServer();
