class AppError extends Error {
	public name: string;
	public code?: number;

	constructor(message: string, options: Partial<AppError> = {}) {
		super(message);

		const { name, code } = options;

		this.name = name || 'INTERNAL_SERVER_ERROR';
		this.code = code || 500;

		Error.captureStackTrace(this);
	}
}

export default AppError;
