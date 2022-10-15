const DEFAULT_PORT = '3002';
const DEFAULT_DB_PATH = 'mongodb://127.0.0.1:27017/beatfilmsdb';

// ERROR MESSAGES
// auth
const INVALID_EMAIL_ERR_MESSAGE = 'Не является email';
const EMAIL_CONFLICT_ERR_MESSAGE = 'Данный email уже занят';
const LOGIN_ERR_MESSAGE = 'Неправильные почта или пароль';
const UNAUTHORIZED_USER_ERR_MESSAGE = 'Необходимо авторизоваться';
// user
const USER_ID_ERR_MESSAGE = 'Пользователь с таким id не найден';
const USER_DATA_ERR_MESSAGE = 'Переданы некорректные данные пользователя';
// movie
const MOVIE_DATA_ERR_MESSAGE = 'Переданы некорректные данные фильма';
const MOVIE_ID_ERR_MESSAGE = 'Фильм с указанным _id не найден';
const DELETE_MOVIE_ERR_MESSAGE = 'Отсутствуют права для удаления данного фильма';
const DELETE_MOVIE_SUCCESS_MESSAGE = 'Удален фильм';
const MOVIE_SCHEMA_REQUIRED_MESSAGES = {
  COUNTRY: 'Cтрока "country" является обязательной',
  DIRECTOR: 'Cтрока "director" является обязательной',
  DURATION: 'Число "duration" является обязательным',
  YEAR: 'Cтрока "year" является обязательной',
  DESCRIPTION: 'Cтрока "description" является обязательной',
  IMAGE: 'Cтрока "image" является обязательной',
  TRAILER_LINK: 'Cтрока "trailer" является обязательной',
  THUMBNAIL: 'Cтрока "thumbnail" является обязательной',
  OWNER: 'Cтрока "owner" является обязательной',
  MOVIE_ID: 'Число "movieId" является обязательным',
  NAME_RU: 'Cтрока "nameRU" является обязательной',
  NAME_EN: 'Cтрока "nameEN" является обязательной',
};

// page
const NOT_FOUND_PAGE_ERR_MESSAGE = 'Страница не найдена';
// 500
const SERVER_ERR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  DEFAULT_PORT,
  DEFAULT_DB_PATH,
  INVALID_EMAIL_ERR_MESSAGE,
  EMAIL_CONFLICT_ERR_MESSAGE,
  USER_ID_ERR_MESSAGE,
  USER_DATA_ERR_MESSAGE,
  NOT_FOUND_PAGE_ERR_MESSAGE,
  MOVIE_DATA_ERR_MESSAGE,
  MOVIE_ID_ERR_MESSAGE,
  DELETE_MOVIE_ERR_MESSAGE,
  LOGIN_ERR_MESSAGE,
  UNAUTHORIZED_USER_ERR_MESSAGE,
  SERVER_ERR_MESSAGE,
  MOVIE_SCHEMA_REQUIRED_MESSAGES,
  DELETE_MOVIE_SUCCESS_MESSAGE,
};
