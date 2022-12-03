import { AppError } from '..';

describe('utils/AppError', () => {
	it('should return default modified Error object', () => {
		const error = new AppError('Internal server error');

		expect(error).toMatchObject({
			message: 'Internal server error',
			code: 500,
			name: 'INTERNAL_SERVER_ERROR',
		});
	});

	it('should return code and name based on option params', () => {
		const error = new AppError('Unauthorized', {
			code: 400,
			name: 'UNAUTHORIZED',
		});

		expect(error).toMatchObject({
			message: 'Unauthorized',
			code: 400,
			name: 'UNAUTHORIZED',
		});
	});
});
