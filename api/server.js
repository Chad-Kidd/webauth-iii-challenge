const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

//SESSION MIDDLEWARE & COOKIES
const sessionConfig = {

  name: 'monster',

  secret: 'keep it secret, keep it safe! - gandalf',

  cookie: {

    httpOnly: true,

    maxAge: 1000 * 60 * 20,

    secure: false,
  },
  resave: false,

  saveUninitialized: true,

  store: new KnexSessionStore({ 
    knex: require('../data/dbConfig'),
    createtable: true,
    clearInterval: 100 * 60 * 15,
  })
}

server.use(session(sessionConfig))
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  console.log('get on serverjs')
  const username = req.session.username || 'STRANGER';
  res.send(`HEY THERE ${username}!!`);
});

module.exports = server;
