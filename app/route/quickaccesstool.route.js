module.exports = function(app) {

    const quickaccesstools = require('../controller/quickaccesstool.controller.js');

    // Create a new quickaccesstool
    app.post('/api/quickaccesstools', quickaccesstools.create);

    // Retrieve all QuickAccessTool
    app.get('/zhcra/quickaccesstools', quickaccesstools.verifyToken, quickaccesstools.findAll);

    // Retrieve a single quickaccesstool by Id
    app.get('/api/quickaccesstools/:quickaccesstoolId', quickaccesstools.findByPk);

    // Update a quickaccesstool with Id
    app.put('/api/quickaccesstools', quickaccesstools.update);

    // Delete a quickaccesstool with Id
    app.delete('/api/quickaccesstools/:quickaccesstoolId', quickaccesstools.delete);

    app.post('/api/quickaccesstools/upload', quickaccesstools.upload);
}