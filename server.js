var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./app/config/db.config.js');

var app = express();

app.use(bodyParser.json({ limit: '50mb' }));

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// force: true will drop the table if it already exists
/*database.sequelize.sync().then(() => {
    console.log('Drop and Resync with { force: true }');
});*/

require('./app/route/quickaccesstool.route.js')(app);
require('./app/route/user.route.js')(app);
require('./app/route/guideline.route.js')(app);
require('./app/route/artguideline.route.js')(app);
require('./app/route/memo.route.js')(app);

// Create a Server
var server = app.listen(8080, function() {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
});