import { AuthorizationGranted } from '../spotify/Spotify.types';

export interface Credentials {
	/**
	 * JWT token of accessToken, userId, and email.
	 */
	idToken: string;
	/**
	 * Spotify refresh token that can be used to generate a new Spotify access token.
	 */
	refreshToken: AuthorizationGranted['refresh_token'];
	/**
	 * The time period (in miliseconds) for which the Spotify access token is valid.
	 */
	expiresIn: AuthorizationGranted['expires_in'];
}

/**
 * JWT Claims
 * @link Reference: https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
 */
export interface AppJWTPayload {
	/**
	 * Issuer of the token.
	 */
	iss: string;
	/**
	 * Access Token that can be provided in Spotify Web API services.
	 */
	sub: Credentials['idToken'];
	/**
	 * Recipients of the token.
	 */
	aud: string | string[];
	/**
	 * Expiration time (in miliseconds) of the token.
	 */
	exp: Credentials['expiresIn'];
	/**
	 * The time (in miliseconds) at which the JWT was issued.
	 */
	iat: number;
}
