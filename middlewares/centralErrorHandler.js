const centralErrorHandler = (err, req, res) => {
  if (err.status) {
    res.status(err.status).send({ message: `${err.message}` });
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка, ${err.message}` });
};

module.exports = centralErrorHandler;
