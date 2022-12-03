export interface Credentials {
	/**
	 * JWT token of accessToken, userId, and email.
	 */
	idToken: string;
	/**
	 * Spotify refresh token that can be used to generate a new Spotify access token.
	 */
	refreshToken: string;
	/**
	 * The time period (in miliseconds) for which the Spotify access token is valid.
	 */
	expiresIn: number;
}
