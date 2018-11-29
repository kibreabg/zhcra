const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const User = db.users;

// Post a User
exports.create = (req, res) => {
    // Save to MySQL database
    let user = req.body;
    User.create(user).then(result => {
        // Send created user to client
        res.json(result);
    });
};

// Fetch all Users
exports.findAll = (req, res) => {
    User.findAll().then(users => {
        // Send all users to Client
        res.json(users);
    });
};

// Find a User by Id
exports.findByPk = (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        res.json(user);
    })
};

// Update a User
exports.update = (req, res) => {
    let user = req.body;
    let id = req.body.id;
    User.update(user, { where: { id: id } }).then(() => {
        res.status(200).json({ msg: "updated successfully a user with id = " + id });
    });
};

// Delete a User by Id
exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({ msg: 'deleted successfully a user with id = ' + id });
    });
};

// Check if User exists
exports.checkUserExists = (req, res) => {
    let user = req.body;
    let uname = user.username;
    let upassword = user.password;

    User.findOne({
        where: { username: uname, password: upassword }
    }).then((authUser) => {
        jwt.sign({ authUser }, 'zhcra', (err, token) => {
            res.json({
                token,
                err
            });
        });
    });
};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
exports.verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer s undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        jwt.verify(bearerToken, 'zhcra', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = authData;
            }
        });

        // Next middleware
        next();
    } else {
        res.sendStatus(403);
    }
};