const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/mern-destinos'; //parametrizando destino db

//conexion
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

module.exports =  mongoose; 


/*mongoose
    .connect('mongodb://127.0.0.1:27017/mern-destinos', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports =  db; */