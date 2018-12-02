const env = {
    database: 'zhcra',
    username: 'root',
    password: 'admin',
    host: '197.221.225.4',
    port: '8788'
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;