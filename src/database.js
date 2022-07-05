const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/tortilleria')
    .then(() => console.log('Database is connected'))
    .catch(err => console.error(err));