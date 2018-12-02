const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
db.quickaccesstools = require('../model/quickaccesstool.model.js')(sequelize, Sequelize);
db.guidelines = require('../model/guideline.model.js')(sequelize, Sequelize);
db.artguidelines = require('../model/artguideline.model.js')(sequelize, Sequelize);
db.memos = require('../model/memo.model.js')(sequelize, Sequelize);



module.exports = db;