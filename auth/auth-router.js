const router = require('express').Router();
const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');
const generateToken = require('../generateToken')

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        
        //TOKEN TOKEN TOKEN TOKEN
        const token = generateToken.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username} have a token!`,
          token,
          department: token.department,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});



module.exports = router;
