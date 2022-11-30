import { Application } from 'express';

import config from '@/config';
import routes from '@/api';

/**
 * Load configured express application
 */
const loadExpress = (app: Application) => {
	/**
	 * Healt check endpoint
	 */
	app.get('/status', (_, res) => {
		res.status(200).end();
	});

	/**
	 * Load API routes
	 */
	app.use(config.api.prefix, routes());
};

export default loadExpress;
