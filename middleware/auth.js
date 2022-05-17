const jwt = require('./jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }
    catch (error){
        return res.status(401).json({code:401, message: "No tienes permiso :("});
        
    }
};
app.use("/employe", pokemon);


app.use((req,res,next) => {
    return res.status(404).json({code: 404,message:"URL no encontrada"});
});