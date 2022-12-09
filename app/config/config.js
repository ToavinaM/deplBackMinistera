require('dotenv').config(); // this is important!
module.exports = {
  "development": { //test
    "username": "postgres",
    "password": "root",
    "database": "Ministera",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "root",
    "database": "Tsisy",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "dbmeah_user",
    "password": "2DfSAzeqJIz9S6h0BzT4XK2CZH4ezfZK",
    "database": "dbmeah",
    "host": "dpg-ce9dtlhgp3jtsams07lg-a",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": "true",
      },
    },
  }
};


