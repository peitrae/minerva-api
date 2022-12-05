/**
 * @link References: https://developer.spotify.com/documentation/general/guides/authorization/code-flow
 */
export interface AuthorizationGranted {
	/**
	 * An Access Token that can be provided in subsequent calls, for example to Spotify Web API services.
	 */
	access_token: string;
	/**
	 *	A token that can be sent to the Spotify Accounts service in place of an authorization code.
	 */
	refresh_token: string;
	/**
	 * How the Access Token may be used: always “Bearer”.
	 */
	token_type: 'Bearer';
	/**
	 * The time period (in seconds) for which the Access Token is valid.
	 */
	expires_in: number;
	/**
	 * A space-separated list of scopes which have been granted for this access_token
	 */
	scope: string;
}
