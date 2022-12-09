import { AuthService } from '@/services';
import {
	AppAuthenticatedSocket,
	AppSocket,
	AppSocketNext,
} from '@/types/socket.types';
import { AppError } from '@/utils';
import Container from 'typedi';

const authenticate = (socket: AppSocket, next: AppSocketNext) => {
	const idToken = socket.handshake.headers.authentication as string | undefined;

	try {
		if (!idToken) {
			throw new AppError({
				message: 'Authentication token is empty',
				name: 'TOKEN_IS_EMPTY',
				status: 401,
			});
		}

		const authServiceInstance = Container.get(AuthService);
		const { accessToken } = authServiceInstance.verifyIdToken(idToken);

		(socket as AppAuthenticatedSocket).user = {
			accessToken,
		};

		next();
	} catch (err) {
		next(err);
	}
};

export default authenticate;
