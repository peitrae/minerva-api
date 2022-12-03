import Container from 'typedi';
import jwt from 'jsonwebtoken';

const injectDependencies = () => {
	try {
		/**
		 * Set jwt metadata
		 */
		Container.set('jwt', jwt);
	} catch (e) {
		throw e;
	}
};

export default injectDependencies;
