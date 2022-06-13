import { Router } from 'express';

import { postUrlsShorten } from '../controllers/urlController.js';
import urlSchema from '../schemas/urlSchema.js';
import schemaMw from '../middlewares/schemaMw.js';
import validateTokenMw from '../middlewares/validateTokenMw.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', schemaMw(urlSchema), validateTokenMw, postUrlsShorten);

export default urlsRouter;
