'use strict';
require("dotenv").config();
console.out = (str) => console.log(`${Date.now()} : ${str}`)

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const { Datastore } = require('@google-cloud/datastore');
const { DatastoreStore } = require('@google-cloud/connect-datastore');
const session = require('express-session');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    store: new DatastoreStore({
        kind: 'express-sessions',
        name: 'trip-busters',
        expirationMs: 0,
        dataset: new Datastore({
            projectId: process.env.GCLOUD_PROJECT,
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })
    }),
    resave: true,
    saveUninitialized: true,
    secret: "Super secret token"
}));

app.listen(process.env.PORT, (err => {
    if (!err) console.out(`Server ${process.env.SERVER_NAME} running on port ${process.env.PORT}`)
    else console.error(err);
}))

//auth handler
require('./router/google-auth')(app)

//ui handler
require('./router/ui')(app);