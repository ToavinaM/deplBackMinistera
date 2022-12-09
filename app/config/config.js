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
  // postgres://dbmeah_4n4p_user:prRAAvQqyPWb3jOI1qrZDsxcDKTSlC1S@dpg-ce9hh9en6mpgqu99ddig-a.oregon-postgres.render.com/dbmeah_4n4p
  "production": {
    "username": "dbmeah_4n4p_user",
    "password": "prRAAvQqyPWb3jOI1qrZDsxcDKTSlC1S",
    "database": "dbmeah_4n4p",
    "host": "dpg-ce9hh9en6mpgqu99ddig-a",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": "true",
      },
    },
  }
};


