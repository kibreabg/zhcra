module.exports = function(app) {

    const quickaccesstools = require('../controller/quickaccesstool.controller.js');

    // Create a new quickaccesstool
    app.post('/zhcra/quickaccesstools', quickaccesstools.create);

    // Retrieve all QuickAccessTool
    app.get('/zhcra/quickaccesstools', quickaccesstools.verifyToken, quickaccesstools.findAll);

    // Retrieve a single quickaccesstool by Id
    app.get('/zhcra/quickaccesstools/:quickaccesstoolId', quickaccesstools.findByPk);

    // Update a quickaccesstool with Id
    app.put('/zhcra/quickaccesstools', quickaccesstools.update);

    // Delete a quickaccesstool with Id
    app.delete('/zhcra/quickaccesstools/:quickaccesstoolId', quickaccesstools.delete);

    app.post('/zhcra/quickaccesstools/upload', quickaccesstools.upload);
}