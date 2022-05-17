const express = require('express');
const empleado = express.Router();
const db = require('../config/database');


empleado.post("/",async(req,res,next) => {
    const {firstName, lastName, mail, phone, address, password}=rep.body
    
    if(firstName && lastName && mail && phone && address && password){
        let query = "INSERT INTO empleado(firstName, lastName, mail, phone, address, password)"
        query += `VALUES ('${firstName}',${lastName},${mail},${phone}, ${address}, ${password})`;
  
        const rows = await db.query(query);
  
        if(rows.affectedRows==1){
            return res.status(201).json({code:201,message:"Agente agregado correctamente"});
        }

        return res.status(500).json({code:500, message: "Ocurrio un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

empleado.delete('/:id([0-9]{1,3})',async (req,res,next)=>{
    const query = `DELETE FROM user_id=${req.params.id}`;

    const rows= await db.query(query);

    if(rows.affectedRows==1){
        return res.status(200).json({code:200,message:"Agente borrado correctamente"});
    }

    return res.status(400).json({code:404,message:"Agente no encontrado"});
});

empleado.put('/:id([0-9]{1,3})',async (req,res,next)=>{
    const {firstName, lastName, mail, phone, address}=rep.body;

    if(firstName && lastName && mail && phone && address && password){
        let query = `UPDATE empleado SET firstName='${firstName}', lastName=${lastName}, `;
            query +=  `mail=${mail}, phone=${phone}, address=${address}, password=${password}`;
            query += `WHERE user_id=${req.params.id};)` 

            const rows = await db.query(query);

            if(rows.affectedRows==1){
                return res.status(200).json({code:200,message:"Agente actualizado correctamente"});
            }
    
            return res.status(500).json({code:500, message: "Ocurrio un error"});
        }
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
        });

empleado.patch('/:id([0-9]{1,3})',async (req,res,next)=>{

    if(req.params.id){
        let query = `UPDATE empleado SET firstName='${req.body.firstName}' WHERE user_id=${req.params.id} `;
        const rows = await db.query(query);

            if(rows.affectedRows==1){
                return res.status(200).json({code:200,message:"Agente actualizado correctamente"});
            }
    
            return res.status(500).json({code:500, message:"Ah ocurrido un error"});
        }

        return res.status(500).json({code:500, message:"Datos incompletos"});
    }); 
empleado.get('/',async (req, res,next)=>{
    const employ = await db.query("SELECT * FROM empleado");
    console.log(employ);
    return res.status(200).json({code:1,message: employ});
});

empleado.get('/:id([0-9]{1,3})',async (req,res,next)=>{
    const id = req.params.id;
       if(id >= 0 && id <= 722){
       const employ = await db.query("SELECT * FROM empleado WHERE user_id=" + id + ";");
       return res.status(200).json({code: 1, message:employ});
    } 
       return res.status(404).send({code:404, message:"Pokémon no encontrado"});
});
 
empleado.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const employ = await db.query("SELECT * FROM empleado WHERE firstName='"+name+"';")
        
        (employ.length > 0) ? 
        res.status(200).json({code: 1, message:employ}) : 
        res.status(404).send({code:404, message:"Agente no encontrado"}); 
    });
module.exports = empleado;
