import { authenticate } from '@/socket/middlewares';
import { AppIO } from '@/types/socket.types';
import loadSocketIO from './socketio';

describe('loaders/socketio', () => {
	it('should configure Socket IO', () => {
		const mockIO = {
			use: jest.fn(),
			on: jest.fn(),
		} as unknown as AppIO;

		loadSocketIO(mockIO);

		expect(mockIO.use).toHaveBeenCalledWith(authenticate);
		expect(mockIO.on).toHaveBeenCalledWith('connection', expect.any(Function));
	});
});
