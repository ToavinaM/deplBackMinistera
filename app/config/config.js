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
    "username": "a27y80vljf9gnhsxl3ru",
    "password": "pscale_pw_tIzTwKrG6c2jDzejd2tV48PDlR4oo7kbM4G9u2e13LQ",
    "database": "dbsolar",
    "host": "us-east.connect.psdb.cloud",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": "true",
      },
    },
  }
};


