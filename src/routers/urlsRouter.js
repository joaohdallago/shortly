import { Router } from 'express';

import { postUrlsShorten } from '../controllers/urlController.js';
import validateTokenMw from '../middlewares/validateTokenMw.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateTokenMw, postUrlsShorten);

export default urlsRouter;
