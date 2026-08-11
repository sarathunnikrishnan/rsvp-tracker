import { Router } from 'express';
import { login, register, getDemoUsers, me } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.get('/demo-users', getDemoUsers);
router.get('/me', authenticate, me);

export default router;
