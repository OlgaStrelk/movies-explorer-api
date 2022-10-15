# Movies Explorer API

## Описание

REST API для аутентификации пользователей и сохранения фильмов в избранном. Создан для сервиса поиска фильмов **Movie Explorer**, в котором можно найти фильмы по ключевым словам.

**адрес домена сервера:**

`https://api.beatfilms.nomoredomains.icu/`

## Схемы и модели:

### Поля схемы `user`:

Поле | Описание
-----|------------
email | Почта пользователя, по которой он регистрируется. Обязательное поле, уникальное для каждого пользователя. Валидируется на соответствие схеме элекстронной почты.
password | Хеш пароля. Обязательное поле-строка. База данных не возвращает это поле.
name | Имя пользователя. Обязательное поле-строка от 2 до 30 символов.

### Поля схемы `movie`:

Поле | Описание
-----|------------
country | Страна создания фильма. Обязательное поле-строка.
director | Режиссёр фильма. Обязательное поле-строка.
duration | Длительность фильма. Обязательное поле-число.
year | Год выпуска фильма. Обязательное поле-строка.
description | Описание фильма. Обязательное поле-строка.
image | Cсылка на постер к фильму. Обязательное поле-строка. URL-адрес.
trailer | Cсылка на трейлер фильма. Обязательное поле-строка. URL-адрес.
thumbnail | Миниатюрное изображение постера к фильму. Обязательное поле-строка. URL-адрес.
owner | **_id** пользователя, который сохранил статью. Обязательное поле.
nameRU | Название фильма на русском языке. Обязательное поле-строка.
nameEN | Название фильма на английском языке. Обязательное поле-строка.

## Методы и роуты

Метод | Роут | Описание
----- |------|---------
GET | `/users/me` | возвращает **email** и **имя**
PATCH | `/users/me` | обновляет информацию о пользователе с переданными в `body` **email** и **имя**
POST | `/movies` | создаёт фильм с передаными в `body` **country**, **director**, **duration**, **year**, **description**, **image*, **trailer**, **nameRU**, **nameEN**, **movieId** и **thumbnail**
GET | `/movies` | возвращает все сохранённые пользователем фильмы
DELETE | `/movies/movieId` | удаляет сохранённый фильм по его **_id**
POST | `/signup` | создает пользователя с передаными в `body` **email**, **password**, **name**
POST | `/signin` | проверяет переданные в `body` **email** и **password** и возвращает **JWT**

## Как запустить код локально с помощью командной строки? 
1) скачать проект `git clone git@github.com:OlgaStrelk/movies-explorer-api.git -b level-1`
2) установить зависимости `npm i`
3) запустить код *в режиме разработки* `npm run dev` или *в режиме продакшн* `npm run start`

## Примеры адресов обращения с телом запроса:

* регистрация

POST https://api.beatfilms.nomoredomains.icu/signup

```javascript
{
    "name": "Olya1",
    "email": "strelod01",
    "password": "12345678"
}
```

* аутентификация

PATCH https://api.beatfilms.nomoredomains.icu/signin

```javascript
{
    "email": "strelod01@yandex.ru",
    "password": "12345678"
}
```

##### Защищенные роуты:

* получить информацию о залогиненном пользователе:

GET https://api.beatfilms.nomoredomains.icu/users/me

* обновить данные пользователя:

PATCH https://api.beatfilms.nomoredomains.icu/users/me

* получить список фильмов

GET https://api.beatfilms.nomoredomains.icu/movies

_пустое тело запроса_

* добавить фильм

POST https://api.beatfilms.nomoredomains.icu/movies

```javascript
{
  "country": "Russia",
  "director": "Balagov K.",
  "duration": 118,
  "year": "2017",
  "description": "1998 год, Нальчик. Илана — девочка-подросток из хорошей семьи, которая все делает наоборот. Перечит матери. Спорит с отцом. Чинит машины в автомастерской, не вылезая из спецодежды. Встречается с парнем, который не нравится ее родителям. Пацанка и красавица, она идет своим путем и жаждет свободы, но когда в доме происходит страшная трагедия, именно Илана оказывается единственной, кто способен спасти семью. Однако какой ценой?",
  "image": "https://www.google.com/search?sxsrf=ALiCzsaGKx-hpu3c7MzQPUrTS_hDCXiBEQ:1664898889075&q=%D0%A2%D0%B5%D1%81%D0%BD%D0%BE%D1%82%D0%B0&stick=H4sIAAAAAAAAAONgFuLVT9c3NEypMi1MK6sqV4Jwk81Ni1OM0vK0JLKTrfQLUvMLclKBVFFxfp5Vbn5ZZmrxIla-C4subL3YeGHvhX0Xmy5sAABAgW0OSwAAAA&sa=X&ved=2ahUKEwi56vrW98b6AhVYaN4KHc1xDDgQ9OUBegQIExAF&biw=764&bih=628&dpr=1.25#",
  "trailerLink": "https://www.youtube.com/watch?v=mMTOCM-VTBE",
  "thumbnail": "https://www.youtube.com/watch?v=mMTOCM-VTBE",
  "nameRU": "Теснота",
  "nameEN": "Tesnota",
  "movieId": 24353534
}
```

* удалить фильм 

DELETE https://api.cinema-explorer.students.nomoredomains.icu/movies/id_добавленного_фильма

_пустое тело запроса_


## Реализованы

* подключение к базе данных 
* роутинг
* авторизация

## Использованные технологии
* Express.js
* nodemon
* MongoDB
* mongoose
* dotenv
* cors
* celebrate, Joi
* validator
* bcryptjs
* jsonwebtoken
* eslint

## Чеклист

[Критерии диплома веб-разработка](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html) 
