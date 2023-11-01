const jwt = require("jsonwebtoken");
const AppError = require('../utils/AppError')

const requireAuth = (req, res, next) => {
  const token = req.cookies.user_flixcart_Id;
  console.log(token, 'From the requireAuth')
  if (token) {
    jwt.verify(token, process.env.JWT_String, (err, decodedToken) => {
      if (err) {
        // console.log(err);
        // res.status(501);
        next(new AppError(err, 401));
        // throw new Error(err.message);

      } else {
        console.log(decodedToken, 'decodedToken');
        next();
      }
    });
  } else {
    next(new AppError("Unknown User", 401));
    
  }
};
module.exports = { requireAuth };
