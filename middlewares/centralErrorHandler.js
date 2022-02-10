const centralErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: `${err.message}` });
  } else {
    res.status(500).send({ message: `На сервере произошла ошибка, ${err.message}` });
  } if (next) {
    next(); // этот некст добавлен только что бы линт не ругался
  }
};

module.exports = centralErrorHandler;
