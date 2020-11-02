const jwt = require('jsonwebtoken');

function jwtVerify(req, res, next) {
    const token = req.header('auth-token');
       if (!token) {
          return res.status(401).json('Access denied');
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
              if (err) {
                err.status = 401;
                err.message = 'Unauthorized, Invalid Token';
                return next(err);
                }
              else if (decoded) {
                next();
              }
           });
          }
module.exports = jwtVerify;
