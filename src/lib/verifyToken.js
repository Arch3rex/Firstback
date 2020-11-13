const jwt = require('jsonwebtoken');

function jwtVerify(req, res, next) {
    const token = req.header('auth-token');
       if (!token) {
          return res.redirect('http://localhost:3000/login');
        }
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded)=>{
              if (err) {
                err.status = 401;
                err.message = 'Unauthorized, Invalid Token';
                res.redirect('http://localhost:3000/login');
                
                }
              else if (decoded) {
                next();
              }
           });
          }
module.exports = jwtVerify;
