import Container from 'typedi';

import UserListener from './user/UserListener';
import { AppIO, AppSocket } from '@/types/socket.types';

/**
 * Listener when socket is connected.
 */
const onConnection = (io: AppIO, socket: AppSocket) => {
	Container.set('io', io);
	Container.set('socket', socket);

	const user = Container.get(UserListener);

	socket.on('user:join-room', user.joinRoom);
};

export default onConnection;
