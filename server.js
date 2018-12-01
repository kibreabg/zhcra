var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const database = require('./app/config/db.config.js');

var app = express();

app.use(express.static('./dist/ZHCRA-portal-client'));
app.use(bodyParser.json({ limit: '50mb' }));
/*
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
*/

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/ZHCRA-portal-client/index.html'));
});

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
app.listen(process.env.PORT || 8080, function() {
    console.log('Server runnning');
});