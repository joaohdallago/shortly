import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from '../db.js';

export const postSignup = async (req, res) => {
  const user = req.body;
  const { name, email, password } = user;

  try {
    delete user.confirmPassword;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    await db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `, [name, email, encryptedPassword]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('Ops! Houve algum erro!');
  }
};

export const postSignin = async (req, res) => {
  const { user } = res.locals;

  try {
    const token = uuid();

    await db.query(`
      INSERT INTO sessions("userId", token)
      VALUES ($1, $2)
    `, [user.id, token]);

    return res.send(token);
  } catch (error) {
    return res.sendStatus(500);
  }
};
