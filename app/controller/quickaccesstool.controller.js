const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
let formidable = require('formidable');
const fs = require('fs');
const QuickAccessTool = db.quickaccesstools;

// Post a QuickAccessTool
exports.create = (req, res) => {
    // Save to MySQL database
    let quickaccesstool = req.body;

    QuickAccessTool.create(quickaccesstool).then(result => {
        // Send created quickaccesstool to client
        res.json(result);
    });
};

// Fetch all QuickAccessTools
exports.findAll = (req, res) => {
    QuickAccessTool.findAll().then(quickaccesstools => {
        // Send all quickaccesstools to Client
        res.json({
            quickaccesstools
        });
    });
};

// Find a QuickAccessTool by Id
exports.findByPk = (req, res) => {
    QuickAccessTool.findByPk(req.params.quickaccesstoolId).then(quickaccesstool => {
        res.json(quickaccesstool);
    })
};

// Update a QuickAccessTool
exports.update = (req, res) => {
    let quickaccesstool = req.body;
    let id = req.body.id;
    QuickAccessTool.update(quickaccesstool, { where: { id: id } }).then(() => {
        res.status(200).json({ msg: "updated successfully a quickaccesstool with id = " + id });
    });
};

// Delete a QuickAccessTool by Id
exports.delete = (req, res) => {
    const id = req.params.quickaccesstoolId;
    QuickAccessTool.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({ msg: 'deleted successfully a quickaccesstool with id = ' + id });
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
                console.log('Token Verification ', err);
                return res.sendStatus(403);
            } else {
                console.log('Token Verified');
                req.user = authData;
                // Next middleware
                next();
            }
        });

    } else {
        return res.sendStatus(403);
    }
};

exports.upload = (req, res) => {
    //Upload the content file
    var form = new formidable.IncomingForm();
    form.uploadDir = "C:/xampp/htdocs/zhcra/Quick_Access_Tools/";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; // 10 MB
    form.multiples = true;

    form.on('file', function(field, file) {
        // Rename the incoming file to the file's name
        fs.rename(file.path, form.uploadDir + "/" + file.name, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }
    });
    // Upload Ended   

};