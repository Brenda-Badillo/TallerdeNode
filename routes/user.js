const express = require('express');
const user = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

user.post("/login", async (req,res, next)=>{
    const { mail, password } = req.body;
    const query = `SELECT * FROM employes WHERE mail = '${mail}' AND password = '${password}'`;
    const rows = await db.query(query);

    if (mail && password) {
        if (rows.length == 1){
            const token = jwt.sign({
                user_id : rows[0].user_id,
                mail: rows[0].mail
            }, "debugkey");
            return res.status(200).json({code:200, message: token});
        }else {
            return res.status(200).json({code:401, message: "Usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code:500, message: "Campos incompletos"});
});

user.get("/", async (req,res,next)=>{
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({code:200, message: rows})
});

module.exports = user;