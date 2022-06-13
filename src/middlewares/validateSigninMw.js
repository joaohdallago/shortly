import bcrypt from 'bcrypt';

import db from '../db.js';

const validateSigninMw = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows: users } = await db.query(`
          SELECT *
          FROM users
          WHERE email=$1
        `, [email]);

    const user = users[0];
    if (!user || !bcrypt.compareSync(password, user?.password)) return res.sendStatus(401);

    res.locals.user = user;
  } catch (error) {
    return res.sendStatus(500);
  }

  return next();
};

export default validateSigninMw;
