import { nanoid } from 'nanoid';

import db from '../db.js';

export const postUrlsShorten = async (req, res) => {
  try {
    const { user } = res.locals;
    const { url } = req.body;
    const shortUrl = nanoid(10);

    await db.query(`
      INSERT INTO urls ("userId", url, "shortUrl")
      VALUES ($1, $2, $3)
    `, [user.id, url, shortUrl]);

    return res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getUrlById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const { rows: urls } = await db.query(`
      SELECT urls.id, urls."shortUrl", urls.url
      FROM urls
      WHERE urls.id = $1
    `, [id]);
    const url = urls[0];
    if (!url) return res.sendStatus(404);

    return res.send(url);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const openShortUrl = async (req, res) => {
  try {
    const { rows: shortUrls } = await db.query(`
      SELECT url, "shortUrl"
      FROM urls
      WHERE urls."shortUrl" = $1
    `, [req.params.shortUrl]);

    if (!shortUrls[0]) return res.sendStatus(404);

    const { url, shortUrl } = shortUrls[0];

    await db.query(`
        UPDATE urls
        SET "visitCount" = "visitCount" + 1
        WHERE urls."shortUrl" = $1
    `, [shortUrl]);

    return res.redirect(url);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { id: urlId } = req.params;
    const { id: userId } = res.locals.user;

    const { rows: urls } = await db.query(`
      SELECT id, "userId"
      FROM urls
      WHERE id = $1
    `, [urlId]);

    const url = urls[0];
    if (!url) return res.sendStatus(404);

    if (url.userId !== userId) return res.sendStatus(401);

    await db.query(`
        DELETE FROM urls
        WHERE id = $1 AND "userId" = $2
    `, [urlId, userId]);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};
