import dotenv from 'dotenv'

dotenv.config()


export default {

  development: {

    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
    dialect: 'mysql'
  },

  test: {

    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
    dialect: 'mysql'
  },

  production: {

    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
    dialect: 'mysql'
  }
}
