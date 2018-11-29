module.exports = function(app) {

    const guidelines = require('../controller/guideline.controller.js');

    // Create a new guideline
    app.post('/api/guidelines', guidelines.create);

    // Retrieve all QuickAccessTool
    app.get('/api/guidelines', guidelines.verifyToken, guidelines.findAll);

    // Retrieve a single guideline by Id
    app.get('/api/guidelines/:guidelineId', guidelines.findByPk);

    // Update a guideline with Id
    app.put('/api/guidelines', guidelines.update);

    // Delete a guideline with Id
    app.delete('/api/guidelines/:guidelineId', guidelines.delete);

    app.post('/api/guidelines/upload', guidelines.upload);
}