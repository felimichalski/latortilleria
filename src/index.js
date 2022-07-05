const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const { create } = require('express-handlebars');

const deleteWWW = (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        next();     
    }
}

// Database
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(deleteWWW);


// Static Files
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use(require('./routes'));

// Running Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})