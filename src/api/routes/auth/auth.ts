import { Router } from 'express';
import Container from 'typedi';

import { AuthService } from '@/services';
import { LoginRequest } from './auth.types';
import { AppError } from '@/utils';

const router = Router();

/**
 * Login route to request Spotify user authorization.
 */
router.post('/login', async (req: LoginRequest, res) => {
	const spotifyAuthCode = req.body.code;

	try {
		if (!spotifyAuthCode) {
			throw new AppError('Authorization code is not exist', {
				code: 400,
				name: 'CODE_IS_EMPTY',
			});
		}

		const authServiceInstance = Container.get(AuthService);

		const credentials = await authServiceInstance.login(spotifyAuthCode);
		const { idToken, refreshToken, expiresIn } = credentials;

		res.status(200).send({
			idToken,
			refreshToken,
			expiresIn,
		});
	} catch (err) {
		res.status(err.code).json({ ...err, message: err.message });
	}
});

export default router;
