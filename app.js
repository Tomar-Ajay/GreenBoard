const express = require('express')
require('./db/mongoose')
const memberRouter = require('./routers/member')
const adminRouter = require('./routers/admin')

const app = express()


app.use(express.json())
app.use(memberRouter)
app.use(adminRouter)


module.exports = app