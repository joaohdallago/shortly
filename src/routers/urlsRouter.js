import { Router } from 'express';

import { getUrlById, openShortUrl, postUrlsShorten } from '../controllers/urlController.js';
import urlSchema from '../schemas/urlSchema.js';
import schemaMw from '../middlewares/schemaMw.js';
import validateTokenMw from '../middlewares/validateTokenMw.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', schemaMw(urlSchema), validateTokenMw, postUrlsShorten);
urlsRouter.get('/urls/:id', getUrlById);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);

export default urlsRouter;
