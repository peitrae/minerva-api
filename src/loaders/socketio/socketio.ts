import { authenticate } from '@/socket/middlewares';
import { AppIO } from '@/types/socket.types';

const loadSocketIO = (io: AppIO) => {
	/**
	 * Authentication middleware
	 */
	io.use(authenticate);

	return io;
};

export default loadSocketIO;
