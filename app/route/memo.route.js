module.exports = function(app) {

    const memos = require('../controller/memo.controller.js');

    // Create a new memo
    app.post('/api/memos', memos.create);

    // Retrieve all QuickAccessTool
    app.get('/api/memos', memos.verifyToken, memos.findAll);

    // Retrieve a single memo by Id
    app.get('/api/memos/:memoId', memos.findByPk);

    // Update a memo with Id
    app.put('/api/memos', memos.update);

    // Delete a memo with Id
    app.delete('/api/memos/:memoId', memos.delete);

    app.post('/api/memos/upload', memos.upload);
}