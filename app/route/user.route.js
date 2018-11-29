module.exports = function(app) {

    const users = require('../controller/user.controller.js');

    // Create a new user
    app.post('/api/users', users.create);

    // Retrieve all User
    app.get('/api/users', users.findAll);

    // Retrieve a single user by Id
    app.get('/api/users/:userId', users.findByPk);

    // Update a user with Id
    app.put('/api/users', users.update);

    // Delete a user with Id
    app.delete('/api/users/:userId', users.delete);

    // Check if user exists
    app.put('/api/login', users.checkUserExists);
}