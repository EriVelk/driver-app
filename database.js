const mongoose = require('mongoose');

const dev_db_url = 'mongodb://localhost/reservationApp';

mongoose.connect(dev_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Database is connect.')).catch(err => console.log('Error: ', err));