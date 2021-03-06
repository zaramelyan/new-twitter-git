const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function authenticate(req, res, next) { 
    try {
      const token = req.headers['x-auth-token'];
      const { id, name, handle } = jwt.verify(
        token,
        new Buffer.from(secret, 'base64')
      );
  
      req.user = { id, name, handle };
      console.log(req.user)
      next();
    } catch (error) {
      res.status(401).send({
        error: 'Unable to authenticate - please use a valid token'
      });
    }
  }
  

  module.exports = {
      authenticate
  };