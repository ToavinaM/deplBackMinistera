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
    "username": "db_meah_user",
    "password": "DbLBZ9YMNtGYvBEWuYMRMk3ySZXm0HS9",
    "database": "db_meah",
    "host": "dpg-ceb6prarrk0bbte04fkg-a.oregon-postgres.render.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": "true",
      },
    },
  }
};


