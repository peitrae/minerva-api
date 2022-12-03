import { Request } from 'express';

export interface LoginRequestBody {
	/**
	 * Spotify authorization code that can be exchanged for an access token.
	 */
	code?: string;
}

export type LoginRequest = Request<{}, {}, LoginRequestBody>;
