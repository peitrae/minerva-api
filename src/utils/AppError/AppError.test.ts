import { AppError } from '..';

describe('utils/AppError', () => {
	it('should returns adjusted error object', () => {
		const error = new AppError({
			status: 500,
			name: 'INTERNAL_SERVER_ERROR',
			message: 'Internal Server Error',
		});

		expect(error).toMatchObject({
			errors: {
				status: 500,
				name: 'INTERNAL_SERVER_ERROR',
				message: 'Internal Server Error',
			},
		});
	});

	it('should returns default adjusted error object even', () => {
		const error = new AppError({
			message: 'Internal Server Error',
		});

		expect(error).toMatchObject({
			errors: {
				status: 500,
				name: 'INTERNAL_SERVER_ERROR',
				message: 'Internal Server Error',
			},
		});
	});
});
