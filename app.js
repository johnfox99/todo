var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController')

var port = process.env.PORT || 3005;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect(config.getDBConnectionString(),
{ useMongoClient: true }, function(ignore, connection){
    connection.onOpen()
}).then(() => {
    console.log('Successfully Connected to Database.');
}).catch(console.error);

setupController(app);

app.listen(port);