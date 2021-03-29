'use strict';
require("dotenv").config();
console.out = (str) => console.log(`${Date.now()} : ${str}`)

const express               = require("express");
const bodyParser            = require("body-parser");
const cors                  = require("cors");
const passport              = require("passport");
const cookieParser          = require('cookie-parser');
const { Datastore }         = require('@google-cloud/datastore');
const { DatastoreStore }    = require('@google-cloud/connect-datastore');
const session               = require('express-session');
const path                  = require('path');
const app                   = express();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const { Datastore } = require('@google-cloud/datastore');
const { DatastoreStore } = require('@google-cloud/connect-datastore');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname + `/../client/build/static`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ======== Session store ======== */
app.use(session({
    store: new DatastoreStore({
        kind: 'express-sessions',
        name: 'trip-busters',
        expirationMs: 1000 * 60 * 60 * 24, // 24 h
        dataset: new Datastore({
            projectId: process.env.GCLOUD_PROJECT,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })
    }),
    resave: true,
    saveUninitialized: true,
    secret: "Super secret token",
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
/** ======== Session store ======== */

app.listen(process.env.PORT, (err => {
    if (!err) console.out(`Server ${process.env.SERVER_NAME} running on port ${process.env.PORT}`)
    else console.error(err);
}))

//auth handler
require('./router/google-auth')(app)

//ui handler
require('./router/ui')(app);

//data handler
require('./router/data')(app);