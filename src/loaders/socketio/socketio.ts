import onConnection from '@/socket/events';
import { authenticate } from '@/socket/middlewares';
import { AppIO } from '@/types/socket.types';

const loadSocketIO = (io: AppIO) => {
	/**
	 * Authentication middleware
	 */
	io.use(authenticate);

	io.on('connection', (socket) => onConnection(io, socket));

	return io;
};

export default loadSocketIO;
