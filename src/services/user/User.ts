import { Inject, Service } from 'typedi';
import { SpotifyService } from '..';
import { JoinRoomResult } from './User.types';

@Service()
class User {
	constructor(@Inject('SpotifyService') private spotify: SpotifyService) {}

	joinRoom(userId: string): Promise<JoinRoomResult> {
		/**
		 * @TODO Change to the actual method
		 *
		 * 1. Get user top pick track and artist
		 * 2. Get user recommendation
		 * 3. Generate playlist
		 * 4. Create room
		 */

		return new Promise((resolve) => {
			resolve({
				status: 'roomCreated',
				message: '',
				data: {
					roomId: '',
					stranger: {
						id: '',
						name: '',
						images: [],
					},
					playlist: {},
				},
			});
		});
	}
}

export default User;
