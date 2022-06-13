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
