const mongoose = require('mongoose')

const DB = process.env.DATABASE;
mongoose.connect(DB)
    .then(() => { console.log("db connected ✅"); })
    .catch((err) => console.log(err.message, "db can't connected ❌"));