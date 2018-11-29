module.exports = (sequelize, Sequelize) => {
    let Memo = sequelize.define('memos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        latest: {
            type: Sequelize.BOOLEAN
        }
    });

    return Memo;
}