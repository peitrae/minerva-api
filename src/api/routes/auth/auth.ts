import { Router } from 'express';
import Container from 'typedi';

import { AuthService } from '@/services';
import { LoginRequest } from './auth.types';
import { AppError } from '@/utils';

const router = Router();

/**
 * Login route to request Spotify user authorization.
 */
router.post('/login', async (req: LoginRequest, res, next) => {
	const spotifyAuthCode = req.body.code;

	try {
		if (!spotifyAuthCode) {
			throw new AppError({
				status: 400,
				name: 'AUTHORIZATION_CODE_IS_EMPTY',
				message: 'Authorization code is not exists',
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
		next(err);
	}
});

export default router;
