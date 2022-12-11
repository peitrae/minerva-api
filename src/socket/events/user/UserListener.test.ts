import Container from 'typedi';

import UserService from '@/services/user/User';
import { generateRandomString } from '@/utils';
import UserListener from './UserListener';
import { AppIO, AppSocket } from '@/types/socket.types';

jest.mock('@/services/user/User');

describe('sockets/events/user', () => {
	let mockIO = {} as unknown as AppIO;
	const mockSocket = {
		join: jest.fn(),
		emit: jest.fn(),
	} as unknown as AppSocket;
	const mockUserService = {
		joinRoom: jest.fn(),
	};

	it('should joins created room and emits status "roomCreated', async () => {
		const mockJoinRoomData = {
			roomId: generateRandomString(24),
			stranger: {
				id: generateRandomString(48),
				name: 'test',
				images: [],
			},
			playlist: [{}],
		};
		const mockJoinResult = {
			status: 'roomCreated',
			message: 'Chat room is created',
			data: mockJoinRoomData,
		};

		mockUserService.joinRoom.mockResolvedValue(mockJoinResult);
		Container.set(UserService, mockUserService);

		const user = new UserListener(mockIO, mockSocket);
		await user.joinRoom({ userId: generateRandomString(24) });

		expect(mockSocket.join).toHaveBeenCalledWith(mockJoinRoomData.roomId);
		expect(mockSocket.emit).toHaveBeenCalledWith(
			'user:join-room-requested',
			mockJoinResult
		);
	});

	it('should emits status "roomWaiting" when chat room is not avalaible', async () => {
		const mockJoinResult = {
			status: 'roomCreated',
			message: 'Chat room is created',
		};

		mockUserService.joinRoom.mockResolvedValue(mockJoinResult);
		Container.set(UserService, mockUserService);

		const user = new UserListener(mockIO, mockSocket);
		await user.joinRoom({ userId: generateRandomString(24) });

		expect(mockSocket.join).not.toHaveBeenCalled();
		expect(mockSocket.emit).toHaveBeenCalledWith(
			'user:join-room-requested',
			mockJoinResult
		);
	});
});
