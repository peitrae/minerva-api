import Container from 'typedi';

import onConnection from '.';
import UserListener from './user/UserListener';
import { AppIO, AppSocket } from '@/types/socket.types';

describe('onConnection', () => {
	it('should register all socket listeners', () => {
		const mockIO = {} as unknown as AppIO;
		const mockSocket = {
			on: jest.fn(),
		} as unknown as AppSocket;

		Container.set('io', mockIO);
		Container.set('socket', mockSocket);
		const user = Container.get(UserListener);

		onConnection(mockIO, mockSocket);

		expect(mockSocket.on).toHaveBeenCalledWith('user:join-room', user.joinRoom);
	});
});
