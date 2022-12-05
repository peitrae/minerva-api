import express, { NextFunction, Request, Response } from 'express';

import config from '@/config';
import routes from '@/api';
import { AppError } from '@/utils';

/**
 * Error handler middleware
 * @link Inspired by: https://stackabuse.com/handling-errors-with-axios
 */
export const handleExpressError = (
	err: any,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	if (!err) {
		return next();
	}

	let error: AppError;

	if (err.errors) {
		/**
		 * Error that comes from our server,
		 * Because the error object template has been adjusted so send the error immediately.
		 */

		return res.status(err.errors.status).json(err);
	} else if (err.response) {
		/**
		 * Error that comes from a request to external entity.
		 * Most commonly it has headers, data, and status property.
		 */
		const { status, statusText } = err.response;

		error = new AppError({
			status,
			message: statusText,
			name: statusText,
		});
	} else {
		/**
		 * Anything else
		 */

		error = new AppError({
			status: 500,
			message: 'Internal Server Error',
			name: 'INTERNAL_SERVER_ERROR',
		});
	}

	return res.status(error.errors.status).json(error);
};

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

	/**
	 * Handle error
	 */
	app.use(handleExpressError);

	return app;
};

export default loadExpress;
