const jwt = require('jsonwebtoken'); // installed this library

const secrets = require('./auth/secrets');

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ['Stark'],
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

    // Stark 
    // Lannister
    // Targaryen