const emailAlreadyUsed = 'Пользователь с данным email адресом уже зарегистрирован';
const badUserData = 'Переданы некорректные данные в метод создания пользователя';
const badMovieData = 'Переданы некорректные данные в метод создания карточки фильма';
const wrongAuthData = 'Передан неверный логин или пароль';
const emailNotFound = 'Пользователь с данным email адресом не зарегистрирован';
const wrongPassword = 'Неверный пароль';
const movieNotFound = 'Фильм с данным _id не существует';
const cantDeleteMovie = 'Вы не можете удалить фильм другого пользователя';
const wrongAuthHeader = 'Заголовок Autorization передаёт невалидные данные или отсутствует';
const wrongToken = 'Токен не совпадет';

module.exports = {
  emailAlreadyUsed,
  badUserData,
  wrongAuthData,
  emailNotFound,
  wrongPassword,
  badMovieData,
  movieNotFound,
  cantDeleteMovie,
  wrongAuthHeader,
  wrongToken,
};
