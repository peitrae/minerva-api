import { Router } from 'express';

import auth from './routes/auth/auth';

const root = Router();

/**
 * List of all routes
 */
root.use('/v1/auth', auth);

export default root;
