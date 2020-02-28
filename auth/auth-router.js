const router = require('express').Router();
const Users = require('./auth-model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  const {password, username} = req.body
  Users.findBy({ username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
  .catch(({name, stack, code, message}) => {
    res.status(500).json({name: name, stack: stack, code: code, message: message});
  });
});

function generateToken(user) {
  const payload = {
    subject: user.id, 
    username: user.username,
  }

  const secret = process.env.JWT_SECRET || "make sure this stays between us"

  const options = {
    expiresIn: '3h'
  }

  return jwt.sign(payload, secret, options)
}
module.exports = router;
