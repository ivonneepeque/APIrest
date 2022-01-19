const express = require('express');
const path = require('path');
const cors = require('cors');

const { mongoose } = require('./database');


const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(cors());//intercambio datos entre serv
app.use(express.json());//entender formato json, tipo bodyparser

//Routes
app.use('/api/destinos/',require('./routes/task.routes'));
app.use('/api/users/',require('./routes/task.users'));

//Static Files
//app.use(express.static(path.join(__dirname, 'public'))); //static files route, react


app.listen(app.get('port'), () =>{
    console.log(`Servidor en puerto ${app.set('port')}`); //parametrizando puerto, evitar problemas al montar en servidor prod
});
