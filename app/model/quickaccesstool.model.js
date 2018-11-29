module.exports = (sequelize, Sequelize) => {
    let QuickAccessTool = sequelize.define('quickaccesstools', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return QuickAccessTool;
}