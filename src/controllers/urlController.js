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

export const getUrlById = 2;
