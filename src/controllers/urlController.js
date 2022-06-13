export const postUrlsShorten = (req, res) => {
  try {
    const { user } = res.locals;
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const getUrlById = 2;
