const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/* Start Express */
let app = express();

/* Setup Express routes */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.text());
app.use('/route/', require('./routes/route'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

/* Catch bad routing and forward to error handler */
app.use((req, res, next) => {
	let err = new Error('Not Found: '+ req.method + ':' + req.originalUrl);
	err.status = 404;
	next(err);
});

/* Setup app server */
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;