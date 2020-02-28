/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const secret = process.env.JWT_SECRET || "make sure this stays between us"

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      console.log("This is req.headers", req.headers)
      if (err) {
        res.status(401).json({message: "Invalid Credentials"})
      } else {
        req.decodedToken = decodedToken

        next()
      }

    })
  } else {
  res.status(401).json({ you: 'shall not pass!' });
  }
};
