const session = require('express-session')
const MongoStore = require('connect-mongo')
const db = require('../config/connection')

module.exports = session({ 
    secret: process.env.sessionSecret,
    resave: false, //if set to true the middleware will attempt to save the data in the session store again and again even if the data in the session has not changed means tons of extra calls to db which is  undesirable
    saveUninitialized: false, //when true, creates a sessuion cookie in the browser and the session store even if no data
    store: MongoStore.create({
        mongoUrl: process.env.mongoURI,
        autoRemove: 'native' // Default
    })
})