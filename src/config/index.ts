import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	/**
	 * Port config
	 */
	port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
	/**
	 * API config
	 */
	api: {
		prefix: '/api',
	},
};
