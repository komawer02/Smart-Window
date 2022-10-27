const express = require('express')
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs')
require('dotenv').config();
const path = require('path');


var db; 

MongoClient.connect(process.env.DB_URL, { useUnifiedTopology: true }, function(err, client){  
    if(err) return console.log(err)

    var port = process.env.PORT || 3000;
    db = client.db('smartwindow');

    app.db = db;
    
    app.listen(port, function() {
        console.log('open server')
    });
});

const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { json } = require('body-parser');
const { send } = require('process');

app.use(session({secret : 'secretCode', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'ID',
  passwordField: 'Password',
  session: true, 
  passReqToCallback: false, 
}, function (inputId, inputPw, done) {
  db.collection('user').findOne({ ID : inputId }, function (err, result) {
    if (err) {
        return done(err)
    }
    if (!result) {
        return done(null, false, { message: '존재하지않는 아이디입니다.' })
    } 
    if (inputPw == result.Password) { 
        return done(null, result) 
    } else {
        return done(null, false, { message: '비밀번호가 틀렸습니다.' })
    }
  })
}));

passport.serializeUser(function(user, done) {
    done(null, user.ID) 
});

passport.deserializeUser(function(id, done){ 
    db.collection('user').findOne({ID : id}, function(err, result) {
        done(null, result) 
    })
});


app.use(express.static(path.join(__dirname, 'build')));



app.use('/auth', require('./routes/auth.js'));

app.use('/main', require('./routes/main.js'));

app.use('/arduino', require('./routes/arduino.js'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

