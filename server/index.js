require('dotenv').config();
const _ = require('lodash');
const Admin = require('./models/Admin');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const homeRouter = require('./routers/home');
const AuthRouter = require('./routers/AuthRouter');
const AdminRouter = require('./routers/AdminRouter')

const withVatiables = require('./middleware/withVariables');




const  passport = require("passport");
const  passportJWT = require("passport-jwt");

const  ExtractJwt = passportJWT.ExtractJwt;
// console.log(ExtractJwt)
const  JwtStrategy = passportJWT.Strategy;
const { env: { PORT, dbLogin, dbPassword, secret } } = process;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secret;

const users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

const app = express();
passport.use(strategy);

app.use(passport.initialize());



const mongo_uri = `mongodb+srv://${dbLogin}:${dbPassword}@cluster0-sxyuu.mongodb.net/test?retryWrites=true&w=majority`;



const store = new MongoStore({
  collection: 'session',
  uri: mongo_uri
})


app.use(async (req, res, next) => {
  const admin = await Admin.findById('5e851f9f89291235d77e583a');
  req.admin = admin;

  next()
})

// app.use(express.static(path.join(___dirname, '../client/build')));
// app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(withVatiables)

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());


app.use('/', AuthRouter);
app.use('/', homeRouter);
app.use('/admin', AdminRouter)



async function start(){
    try {
        await mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false }, (err) => {
            if (err) {
              throw err;
            } else {
              console.log(`Successfully connected to ${mongo_uri}`);
            }
          });

          const candidate = await Admin.findOne();
          if (!candidate) {
            const user = new Admin({
              email: 'idon@mail.com',
              admin: true,
              password: '123'
            })

            await user.save()
          }
        app.listen(PORT, () => console.log('start'))
    } catch(e) {
        console.log(e)
    }
}

start()