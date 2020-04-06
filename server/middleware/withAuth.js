const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

function auth(req, res, next) {
  if (!req.session.isAuth) {
    return res.send('un auth')
  }
  next()
}
module.exports = withAuth;