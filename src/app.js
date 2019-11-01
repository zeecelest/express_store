const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const users = [
  {
    "id": "3c8da4d5-1597-46e7-baa1-e402aed70d80",
    "username": "sallyStudent",
    "password": "c00d1ng1sc00l",
    "favoriteClub": "Cache Valley Stone Society",
    "newsLetter": "true"
  },
  {
    "id": "ce20079c-2326-4f17-8ac4-f617bfd28b7f",
    "username": "johnBlocton",
    "password": "veryg00dpassw0rd",
    "favoriteClub": "Salt City Curling Club",
    "newsLetter": "false"
  }
];

app.post('/user', (req, res) => {
  // get the data
  const { username, password, favoriteClub, newsLetter = false } = req.body;

  // validation code here
  if (!username) {
    return res
      .status(400)
      .send('Username required');
  }

  if (!password) {
    return res
      .status(400)
      .send('Password required');
  }

  if (!favoriteClub) {
    return res
      .status(400)
      .send('favorite Club required');
  }

  if (username.length < 6 || username.length > 20) {
    return res
      .status(400)
      .send('Username must be between 6 and 20 characters');
  }

  // password length
  if (password.length < 8 || password.length > 36) {
    return res
      .status(400)
      .send('Password must be between 8 and 36 characters');
  }

  // password contains digit, using a regex here
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return res
      .status(400)
      .send('Password must be contain at least one digit');
  }

  const clubs = [
    'Cache Valley Stone Society',
    'Ogden Curling Club',
    'Park City Curling Club',
    'Salt City Curling Club',
    'Utah Olympic Oval Curling Club'
  ];

  // make sure the club is valid
  if (!clubs.includes(favoriteClub)) {
    return res
      .status(400)
      .send('Not a valid club');
  }
  res.send('All validation passed');
});

const id = uuid();
const newUser = {
  id,
  username,
  password,
  favoriteClub,
  newsLetter
};

users.push(newUser);

res.send('All validation passed');


module.exports = app;