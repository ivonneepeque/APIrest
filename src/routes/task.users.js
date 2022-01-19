const express = require('express');
const routerU = express.Router();
const usersModel = require('../models/users');
const jwt = require('jsonwebtoken');


//login
routerU.post('login/', async (req, res) => {
    const usersRs = await usersModel.find();  //consult all data in that collection  //async
    res.json(usersRs);
 });


//All post
routerU.get('/', async (req, res) => {
   const usersRs = await usersModel.find();  //consult all data in that collection  //async
   res.json(usersRs);
});

//Create user  
routerU.post('/', async (req, res) => {
    try {
        console.log(req.body);
        //catch/get sended values by user
        const {firstname, lastname, age, nationality, profession} = req.body;
        var newUser = new usersModel({            
            firstname: firstname,
            lastname: lastname,
            age: age,
            nationality: nationality,
            profession: profession
        });

        //console.log(newUser);
        //save new user
        await newUser.save();
        res.json({
            status:'200',
            message:'User Guardado'
        });
    } catch (err) {        
        res.json({
            status:'500',
            message:"Error al crear usuario. Intente de nuevo más tarde"
        });
    }
 });


//Read user data //get() 1 usuario data /:id
routerU.get('/:id', async (req, res) => {
    //console.log(req.params.id);
    const nota = await usersModel.findById(req.params.id);
    res.json(nota);
 });

//Edit user //put() /:id  
routerU.put('/:id', async (req, res) => {
    const {firstname, lastname, age, nationality, profession} = req.body;
    //edit user 
    try {
        const userU = await usersModel.findByIdAndUpdate(req.params.id, 
            {
                firstname,
                lastname,
                age,
                nationality,
                profession
            }
        );
        //findOneAndUpdate  //función más actual
        res.json({            
            status:'200',
            message:'Usuario actualizado correctamente'
        });
    } catch (err) {        
        res.json({
            status:'500',
            message:"Error al modificar usuario, intente de nuevo más tarde"
        });
    }
 });

 //Delete user //delete()
routerU.delete('/:id', async (req, res) => {
    try {
        const userD = await usersModel.findByIdAndDelete(req.params.id);    
        res.json({
            status:'200',
            message:'Elimina post id señalado'+userD
        });
    } catch (err) {        
        res.json({
            status:'500',
            message:"Error al borrar usuario, intente de nuevo más tarde"
        });
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

module.exports = routerU;