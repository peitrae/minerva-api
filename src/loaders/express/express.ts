import express from 'express';

import config from '@/config';
import routes from '@/api';

/**
 * Load configured express application
 */
const loadExpress = () => {
	const app = express();
	/**
	 * Healt check endpoint
	 */
	app.get('/status', (_, res) => {
		res.status(200).end();
	});

	/**
	 * Transforms the raw string of req.body into json
	 */
	app.use(express.json());

	/**
	 * Load API routes
	 */
	app.use(config.api.prefix, routes);

	return app;
};

export default loadExpress;
