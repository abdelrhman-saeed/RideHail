import dotenv from 'dotenv'
import credentials from '../config/database/sequelize_credentails.js';
import { Sequelize } from 'sequelize';

dotenv.config()

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_ROOT_PASSWORD,
    credentials['development']);

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB error:', err));


export default sequelize
