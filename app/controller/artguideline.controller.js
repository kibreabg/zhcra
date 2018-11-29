const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
let formidable = require('formidable');
const fs = require('fs');
const ArtGuideline = db.artguidelines;

// Post a ArtGuideline
exports.create = (req, res) => {
    // Save to MySQL database
    let artguideline = req.body;

    ArtGuideline.create(artguideline).then(result => {
        // Send created artguideline to client
        res.json(result);
    });
};

// Fetch all Guidelines
exports.findAll = (req, res) => {
    ArtGuideline.findAll().then(artguidelines => {
        // Send all artguidelines to Client
        res.json({
            artguidelines
        });
    });
};

// Find a ArtGuideline by Id
exports.findByPk = (req, res) => {
    ArtGuideline.findByPk(req.params.artguidelineId).then(artguideline => {
        res.json(artguideline);
    })
};

// Update a ArtGuideline
exports.update = (req, res) => {
    let artguideline = req.body;
    let id = req.body.id;
    ArtGuideline.update(artguideline, { where: { id: id } }).then(() => {
        res.status(200).json({ msg: "updated successfully a artguideline with id = " + id });
    });
};

// Delete a ArtGuideline by Id
exports.delete = (req, res) => {
    const id = req.params.artguidelineId;
    ArtGuideline.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({ msg: 'deleted successfully a artguideline with id = ' + id });
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
    form.uploadDir = "C:/xampp/htdocs/zhcra/ArtGuideline/";
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