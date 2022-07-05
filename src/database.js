require('dotenv').config()

const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Database is connected'))
    .catch(err => console.error(err));