import { AuthorizationGranted } from '@/services/spotify/Spotify.types';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type AppIO = Server<
	DefaultEventsMap,
	DefaultEventsMap,
	DefaultEventsMap,
	any
>;

export type AppSocket = Socket<
	DefaultEventsMap,
	DefaultEventsMap,
	DefaultEventsMap,
	any
>;

export interface AppAuthenticatedSocket extends AppSocket {
	user: {
		accessToken: AuthorizationGranted['access_token'];
	};
}

export interface AppSocketExtendedError extends Error {
	data?: any;
}

export type AppSocketNext = (err?: AppSocketExtendedError | undefined) => void;
