/* Notas - Ivonne Espinosa*/
const express = require('express');
const router = express.Router(); 
const NoteModel = require('../models/notes');
const jwt = require('jsonwebtoken');

//login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    //usuario fijo para fines de ejemplo
    user_test = "usuario1";
    passw_test = "test1"; 

    const user = {username: username};

    if( (username == user_test) && (password == passw_test)){
       
        //siendo validos los accesos
        const accessToken = generaAccessToken(user);

        res.header('authorization', accessToken).json({
            message: 'Acceso autorizado',
            token: accessToken
        });
    }else{
        //accesos no validos
        return res
        .status(401)
        .send({ message: "Acceso no autorizado" });
    }

   
 });

//función para generar token 
 function generaAccessToken(user){
    return jwt.sign(user,'tareaRestApp',{expiresIn:'10m'});
 }

//Middelware valida existencia de token
 function validaExisteToken(req, res, next){
    const accessToken = req. headers['authorization'];
    if(accessToken){
        jwt.verify(accessToken,'tareaRestApp', (err, user) =>{
            if(err){ //token no valido
                res
                .status(401)
                .send('Acceso denegado, token expirado o incorrecto');
            }else{
                next(); //mandando llamar funcion, visualizar datos
            }
        });
    }else{
        res
        .status(401)
        .send('Acceso denegado');
    }
 }



//Show all notes
router.get('/', validaExisteToken, async (req, res) => {
   const notesRs = await NoteModel.find();  //consult all data in that collection  //async
   
   return res
            .status(200)
            .json(notesRs);
});

//Create note  //status:'Creando post'
router.post('/', async (req, res, err) => {
    try{    
        // console.log(req.body);
        //catch/get sended values by user
        const {title, content, author} = req.body;
        var newNote = new NoteModel({
            title: title,
            content: content,
            author: author
        });

        console.log(newNote);
        //save note in DB
        await newNote.save();
        
        return res
                .status(200)
                .send({ message: "Nota guardada correctamente" });


    } catch (err) {        
        res
            .status(400)
            .json({message:"Error al intentar crear nota. Intente de nuevo más tarde"});
    }
 });


//Read post //get() 1 nota /:id
router.get('/:id', validaExisteToken, async (req, res) => {
    //console.log(req.params.id);
    try{
        const nota = await NoteModel.findById(req.params.id);
        //res;
        return res
        .status(200)
        .json(nota);
    } catch (err) {        
        res
        .status(400)
        .json({message:"Error, nota no encontrada. Intente de nuevo más tarde"});
    }
 });

//Edit post //put() /:id  
router.put('/:id', validaExisteToken, async (req, res) => {
    try{
        //console.log(req.params.id, req.body);
        const {title, content, author} = req.body;
        const notaU = await NoteModel.findByIdAndUpdate(req.params.id, 
            {
                title,
                content,
                author
            }
        );
        //findOneAndUpdate  //función más actual
        
        res.json({
            status:'200',
            message:'Nota Editada correctamente'
        });
    } catch (err) {        
        res
        .status(400)
        .json({message:"Error editando nota. Intente de nuevo más tarde"});
    }
 });

 //Delete post //delete()
router.delete('/:id', validaExisteToken, async (req, res) => {
    try{
        const notaD = await NoteModel.findByIdAndDelete(req.params.id);    
        res.json({
            status:'200',
            message:'Nota eliminada correctamente'
        });
    } catch (err) {        
        res
        .status(400)
        .json({message:"Error al borrar nota. Intente de nuevo más tarde"});
    }
 });

 /*
 route.route(/)
    .get()
    .post()
 route.route(/:id)
    .get()
    .put()
    .delete()*/ 
 //

module.exports = router;