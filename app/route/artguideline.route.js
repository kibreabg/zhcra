module.exports = function(app) {

    const artguidelines = require('../controller/artguideline.controller.js');

    // Create a new artguideline
    app.post('/api/artguidelines', artguidelines.create);

    // Retrieve all QuickAccessTool
    app.get('/api/artguidelines', artguidelines.verifyToken, artguidelines.findAll);

    // Retrieve a single artguideline by Id
    app.get('/api/artguidelines/:artguidelineId', artguidelines.findByPk);

    // Update a artguideline with Id
    app.put('/api/artguidelines', artguidelines.update);

    // Delete a artguideline with Id
    app.delete('/api/artguidelines/:artguidelineId', artguidelines.delete);

    app.post('/api/artguidelines/upload', artguidelines.upload);
}