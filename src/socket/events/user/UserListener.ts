import Container, { Inject, Service } from 'typedi';

import { UserService } from '@/services';
import { JoinRoomListenerPayload } from './UserListener.types';
import { AppIO, AppSocket } from '@/types/socket.types';

@Service()
class UserListener {
	constructor(
		@Inject('io') private io: AppIO,
		@Inject('socket') private socket: AppSocket
	) {}

	async joinRoom({ userId }: JoinRoomListenerPayload) {
		const userServiceInstance = Container.get(UserService);
		const result = await userServiceInstance.joinRoom(userId);

		if (result.data) {
			this.socket.join(result.data.roomId);
		}

		this.socket.emit('user:join-room-requested', result);
	}
}

export default UserListener;
