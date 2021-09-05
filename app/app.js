//nodejs modules
const path = require('path')
const fs = require('fs')
const https = require('https')
//npm modules
const express = require('express')
const session = require('express-session')
//validador
const validador = require('./validador/validador')
//server certificates and ports
const portHttp = 4023
const portHttps = 4024
const credentials = {
    key: fs.readFileSync(__dirname + '/certificates/key.pem','utf-8'),
    cert: fs.readFileSync(__dirname + '/certificates/server.crt','utf-8')
}
//other variables
const store = new session.MemoryStore()
//express app creation
const app = express()
//express router
const appRouter = require('./router/appRouter')
//configuring app
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../views/templates'))
app.use(express.static(path.join(__dirname,'../views/public')))
app.use(express.urlencoded())
app.use(express.json())
app.use(session({
    secret: "baseNovosPCs",
    name: "baseNovosPCs",
    resave: true,
    saveUninitialized: false,
    store: store
}))
app.use(validador.validaToken)

//testRoute
app.use(appRouter)

//server creation
https.createServer(credentials,app).listen(portHttps)
