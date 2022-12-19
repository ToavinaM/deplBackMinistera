require('dotenv').config(); // this is important!
module.exports = {
  "development": { //test
    "username": "postgres",
    "password": "admin",
    "database": "suivi-operationnel",
    "host": "localhost",
    "dialect": "postgres"
  },

  
  
  "test": {
    "username": "cua_sma",
    "password": "cua_sma",
    "database": "bd_sma",
    "host": "102.16.44.235",
    "dialect": "mysql"
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