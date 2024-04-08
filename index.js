
// for environment variables
import dotenv from 'dotenv';
dotenv.config();

// connect to database
import { connectWithDb } from './config/mongoose.js';
connectWithDb();
import router  from './routes/index.js';
// express
import express from 'express';

// passport
import passport from 'passport';

// for parsing the data in cookie
import cookieParser from 'cookie-parser';

// store the session create by passport
import session from 'express-session';

// importing layouts 
import expressLayouts from 'express-ejs-layouts';

// flash messages package and middleware
import flash from 'connect-flash';
import * as myMware from './config/middleware.js';

// store the session in mongostore
import MongoStore from 'connect-mongo';


// port
const {PORT} = process.env;

// creatin app
const app = express();

// middlewares

// for reading json data
app.use(express.json());
// for reading url data
app.use(express.urlencoded({
    extended:true
})); 

// for static files folder
app.use(express.static('assets'));

// for parsing the cookies
app.use(cookieParser());

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting view engine as ejs and defining its path
app.set('view engine','ejs');
app.set('views','./views');

// Use express-session for session management
app.use(session({
    secret: process.env.SECRET_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (1 day in this example)
      secure: false, // Set this to false to allow the session over HTTP
    },
    // store the session in database
    store: MongoStore.create({
      mongoUrl:process.env.MONGODB_URL
    })
  }));
  
// connect-flash middleware
app.use(flash());
app.use(myMware.setFlash);

// initialize passport
app.use(passport.initialize());
// passport sessions
app.use(passport.session());

// store the logged in user's data in locals variable
app.use(passport.setAuthenticatedUser);

// routes
app.use('/',router);

// fire up server
app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`));