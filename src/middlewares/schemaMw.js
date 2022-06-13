const schemaMw = (schema) => (req, res, next) => {
  const validation = schema.validate(req.body);

  if (validation.error) return res.status(422).send('Preencha os campos corretamente!');

  return next();
};

export default schemaMw;
