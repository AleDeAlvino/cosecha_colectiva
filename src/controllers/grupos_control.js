const db = require('../../config/database');
import {Fecha_actual, generarCodigoValido} from '../funciones_js/validaciones';

// Funcion para creacion de grupos
export const crear_grupos = async (req, res) => {
    // Recoger los datos del body
    const {Nombre_grupo, Localidad, Municipio, Estado, CP, Pais} = req.body;
    // Verificar que los campos esten completos
    if(Nombre_grupo && Localidad && Municipio && Estado && CP && Pais){
        // Crear el codigo de grupo
        const codigo_grupo = await generarCodigoValido();
        const Fecha_reg = Fecha_actual();
        let query = "INSERT INTO grupos (Nombre_grupo, Codigo_grupo, Localidad, Municipio, Estado, CP, Pais, Fecha_reg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const rows = await db.query(query, [Nombre_grupo, codigo_grupo, Localidad, Municipio, Estado, CP, Pais, Fecha_reg]);
        return res.status(201).json({code: 201, message: "Grupo registrado correctamente" });

    }else{
        //campos incompletos
        res.status(400).json({code: 400, message: 'Campos incompletos'});
    }

}