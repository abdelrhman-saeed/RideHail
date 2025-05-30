import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//import configFile from '../config/config.js';
import configFile from '../config/database/sequelize_credentails.js'
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // dynamic import doesn't support sync, so use require-style import via 'createRequire'
    // or switch to async imports. Here we can use dynamic import with top-level await (Node 18+):
    // But for simplicity, use synchronous import with createRequire:
  });

for (const file of fs.readdirSync(__dirname).filter(file =>
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.slice(-3) === '.js' &&
  file.indexOf('.test.js') === -1
)) {
  // Import each model dynamically
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;