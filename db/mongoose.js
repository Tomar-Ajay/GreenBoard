const mongoose = require('mongoose')

const connection_url = MONGO_KEY

mongoose.connect( connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
