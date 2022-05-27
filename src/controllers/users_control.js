const jwt = require('jsonwebtoken');
const db = require('../../config/database');
var bcrypt = require('bcrypt');
const {secret} = require('../../config/config');
import {validarCurp, Fecha_actual} from '../funciones_js/validaciones';

export const getPrueba = async (req, res) => {
    // let query = "SELECT * FROM socios";
    // const rows = await db.query(query);
    // console.log(rows);
    res.send('Hello World')
}

export const register = async (req, res) => {
    const {Nombres, Apellidos, CURP, Fecha_nac, Nacionalidad, Sexo, Escolaridad, Ocupacion, Estado_civil, Hijos, Telefono, Email, Localidad, Municipio, Estado, CP, Pais, Foto_perfil, Username, Password, Pregunta_sec, Respuesta_sec} = req.body;
    
    //comprobar que el usuario no exista
    let query = "SELECT * FROM socios WHERE Username = ?";
    const rows = await db.query(query, [Username]);
    if(rows.length > 0){
        return res.status(400).json({ code: 400, message: 'El usuario ya existe' });
    }

    //comprobar que el curp sea valido
    if(!validarCurp(CURP)){
        return res.status(400).json({ code: 400, message: 'El curp no es valido' });
    }
    //comprobar que el curp sea unico
    query = "SELECT * FROM socios WHERE CURP = ?";
    const curpsIguales = await db.query(query, [CURP]);
    if(curpsIguales.length > 0){
        return res.status(400).json({ code: 400, message: 'El curp ya existe' });
    }

    //comprobar que los campos esten completos
    if(Nombres && Apellidos && CURP && Fecha_nac && Nacionalidad && Sexo && Escolaridad && Ocupacion && Estado_civil && Hijos && Telefono && Email && Localidad && Municipio && Estado && CP && Pais && Foto_perfil && Username && Password && Pregunta_sec && Respuesta_sec){
        var BCRYPT_SALT_ROUNDS =12   //variable para indicar los saltos a bcrypt
        bcrypt.hash(Password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword){
            var password = hashedPassword;
            console.log(password);
            const Fecha_reg = Fecha_actual();
            let query = "INSERT INTO socios (Nombres, Apellidos, CURP, Fecha_nac, Nacionalidad, Sexo, Escolaridad, Ocupacion, Estado_civil, Hijos, Telefono, Email, Localidad, Municipio, Estado, CP, Pais, Foto_perfil, Username, Password, Fecha_reg, Pregunta_sec, Respuesta_sec)";
            query += `VALUES ('${Nombres}', '${Apellidos}', '${CURP}', '${Fecha_nac}', '${Nacionalidad}', '${Sexo}', '${Escolaridad}', '${Ocupacion}', '${Estado_civil}', '${Hijos}', '${Telefono}', '${Email}', '${Localidad}', '${Municipio}', '${Estado}', '${CP}', '${Pais}', '${Foto_perfil}', '${Username}', '${password}', '${Fecha_reg}', '${Pregunta_sec}', '${Respuesta_sec}')`;
            db.query(query);

            res.json({code: 200, message: 'Usuario guardado'}).status(200);
        })
        .catch(function(error){
            console.log("Error saving user: ");
            console.log(error);
            res.status(500).json({code: 500, message:'Algo salio mal'});
        })
        
    }else{
        //campos incompletos
        res.status(400).json({code: 400, message: 'Campos incompletos'});
    }

    ///codigos de respuesta . . .
    //200: usuario autenticado
    //400: error del usuario
    //500: error del servidor
}

//funcion para login
export const login = async (req, res) => {
    const { Username, Password } = req.body;
    let query = "SELECT * FROM socios WHERE Username = ?";
    let result = await db.query(query, [Username]);
    
    //validar que existe el usuario
    if(result.length > 0){
        //validar que la contraseña sea correcta
        if(bcrypt.compareSync(Password, result[0].Password)){
            //generar token
            const token = jwt.sign({
                Username: result[0].Username,
                Socio_id: result[0].Socio_id
            }, secret);

            //mandando token por el header
            res.status(200)
                .header('Authorization', token)
                .json({ code: 200, message: 'Usuario autenticado'})
        }
    }
    else{
        //usuario no existe
        res.status(400).json({code: 400, message: 'Usuario no existe'});
    }

    //codigos de respuesta . . .
    //200: usuario autenticado
    //400: error del usuario
    //500: error del servidor
}
