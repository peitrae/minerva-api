import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const privateKeyPath = path.resolve(__dirname, '../../private.key');
const publicKeyPath = path.resolve(__dirname, '../../public.key');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const envFound = dotenv.config();

if (envFound.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

/**
 * Some properties use getter function to add default value.
 */
export default {
	/**
	 * Port config
	 */
	port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
	/**
	 * Base url of the server.
	 */
	get baseURL() {
		return process.env.BASE_URL || `http://localhost:${this.port}`;
	},
	/**
	 * Base url of the client.
	 */
	clientURL: process.env.BASE_URL || 'http://localhost:3000',
	jwt: {
		privateKey,
		publicKey,
		/**
		 * RS256 ensures non-repudiation and can be roatated re-deploying your application with a new secret.
		 */
		algorithm: (process.env.JWT_ALGORITHM as unknown as Algorithm) || 'RS256',
	},
	/**
	 * API config
	 */
	api: {
		prefix: '/api',
	},
	/**
	 * Spotify Web API config
	 */
	spotify: {
		baseURL: 'https://accounts.spotify.com/api',
		clientId: process.env.SPOTIFY_CLIENT_ID as string,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
		redirectURI: process.env.SPOTIFY_REDIRECT_URI as string,
	},
};
