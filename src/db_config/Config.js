const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user')
    .then(() => { console.log("DATABASE connected ✅") })
    .catch(() => { console.log("DATABASE can't connected ❌") })