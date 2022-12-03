import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
		secret: process.env.JWT_SECRET as string,
		algorithm: (process.env.JWT_SECRET as unknown as Algorithm) || 'HS256', // TODO: Explain why using HS256
	},
	/**
	 * API config
	 */
	api: {
		prefix: '/api',
	},
};
