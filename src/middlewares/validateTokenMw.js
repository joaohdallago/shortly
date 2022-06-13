import db from '../db.js';

const validateTokenMw = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer', '').trim();

    if (!token) return res.sendStatus(401);

    const { rows: userBySessions } = await db.query(`
        SELECT users.id
        FROM sessions
        JOIN users ON users.id = sessions."userId"
        WHERE sessions.token = $1
    `, [token]);

    const user = userBySessions[0];

    if (!user) return res.sendStatus(401);

    res.locals.user = user;

    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default validateTokenMw;
