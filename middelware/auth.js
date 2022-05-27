import jwt from "jsonwebtoken";
const {secret} = require("../config/config");

//auth con jwt en el header
export const auth = (req, res, next) => {
    //rescatar token del header
    const token = req.header('Authorization');
    //validar que exista el token
    if(token){
        //validar el token
        try{
            jwt.verify(token, secret);
            next();
        }catch(err){
            res.status(401).json({code: 401, message: 'Token invalido'});
        }
    }else{
        res.status(401).json({code: 401, message: 'No hay token'});
    }
}