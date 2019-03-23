const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const compression = require('compression');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const listEndpoints = require('express-list-endpoints');
const config = require('./config/config');
const db = require('./integrations/mongodb');
const app = express();

db.connect();

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/views')));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

fs.readdirSync(path.join(__dirname, 'modules/tasks/')).map(file => {
  if (file && file.includes('routes')) {
    require('./modules/tasks/' + file)(app);
  }
});

app.route('/docs').get((req, res) => {
  res.render('docs/index', {
    app: {
      title: 'Render Express + Handlebars'
    },
    endpoints: listEndpoints(app)
  });
});

app.listen(config.PORT, err => {
  console.log(`EXPRESS-API funcionando en el purto ${config.PORT}`, err);
});

module.exports = app;
