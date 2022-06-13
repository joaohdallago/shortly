import { Router } from 'express';

import schemaMw from '../middlewares/schemaMw.js';

import signupSchema from '../schemas/signupSchema.js';

import { postSignin, postSignup } from '../controllers/authController.js';
import signinSchema from '../schemas/signinSchema.js';
import validateSigninMw from '../middlewares/validateSigninMw.js';

const authRouter = Router();

authRouter.post('/signup', schemaMw(signupSchema), postSignup);
authRouter.post('/signin', schemaMw(signinSchema), validateSigninMw, postSignin);

export default authRouter;
