const { User } = require('../models');

const userData =
[
  {
    "username": "Jimbob32",
    "email": "jimbob32@gmail.com",
    "password": "jimbob32"
  },
  {
    "username": "selena89",
    "email": "selena89@gmail.com",
    "password": "selena89"
  },
  {
    "username": "luujason98",
    "email": "jasonluu@gmail.com",
    "password": "jason1234"
  },
  {
    "username": "amykatherine",
    "email": "ameliak@gmail.com",
    "password": "kathy7777"
  },
  {
    "username": "dalton4ever",
    "email": "dalton.juno@gmail.com",
    "password": "daltjun123"
  }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;