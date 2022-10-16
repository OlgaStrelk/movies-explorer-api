const { checkToken } = require('../utils/jwt');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { UNAUTHORIZED_USER_ERR_MESSAGE } = require('../utils/consts');

const isAuthorized = (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(UNAUTHORIZED_USER_ERR_MESSAGE));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED_USER_ERR_MESSAGE));
    return;
  }
  req.user = payload;
  next();
};

module.exports = isAuthorized;
