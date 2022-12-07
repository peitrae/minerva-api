import Container from 'typedi';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '@/config';

const injectDependencies = () => {
	/**
	 * Set jwt metadata
	 */
	Container.set('jwt', jwt);

	/**
	 * Set http client metadata
	 */
	const spotifyClient = axios.create({
		baseURL: config.spotify.baseURL,
	});
	Container.set('spotifyClient', spotifyClient);
};

export default injectDependencies;
