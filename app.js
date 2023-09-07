/**** Import necessary packages and files ***/ 
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const sequelize = require('./utils/database');
const student = require('./models/Student');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');
const homeRoutes = require('./routes/homeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

/**** express app ****/ 
const app = express();

/*** configuring connect-flash for flash messages in the application ***/
app.use(session({
    secret: 'secretKeyForFlashMessages',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 10000,
    }
}));
app.use(flash());


/***** configure the .env file ******/ 
dotenv.config({path : 'config.env'});

/**** Initialize the port value on which server will be listening ******/ 
const PORT = process.env.PORT || 8080;

/**** register the view engine *****/ 
app.set('view engine', 'ejs');

/**** middleware and static files ****/ 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**** express layouts *****/ 
app.use(expressEjsLayouts);
app.set('layout', 'layout');

/*******  create tables if not exist otherwise sync the tables  *******/
sequelize
    .sync()
    .then((result) => {
        console.log(`${result}`);
    })
    .catch((error) => {
        console.log(`${error}`);
    });


/***** Routes ********/ 
app.use(homeRoutes); 
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);

/*** 404 Page ***/ 
app.use('/', (req, res) => {
    res.render('404', {title : '404'});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}...`);
});

