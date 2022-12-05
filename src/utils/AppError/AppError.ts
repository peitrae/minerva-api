import { constantCase } from 'constant-case';

import { Errors } from './AppError.types';

/**
 * Error objects template that (most commonly) will be used to sent to the client.
 */
class AppError extends Error {
	public errors: Errors;

	constructor({ message, name, status }: any) {
		super(message);

		this.errors = {
			status: status || 500,
			name: name ? constantCase(name) : 'INTERNAL_SERVER_ERROR',
			message,
		};

		Error.captureStackTrace(this);
	}
}

export default AppError;
