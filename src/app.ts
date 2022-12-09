import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
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
	const io = new Server(server);

	/**
	 * Initialize all loaders
	 */
	initLoaders({ app, io });

	server.listen(config.port, () => {
		console.log(`Server listening on port: ${config.port}`);
	});

	return { app, server };
};

const { app, server } = startServer();

export { app, server };
