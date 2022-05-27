const db = require('../../config/database');
const random = require('string-random');

export const validarCurp = function (curp) {
    const regex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    if (regex.test(curp)) {
        return true;
    } else {
        return false;
    }
}

export const Fecha_actual = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    return year + '-' + month + '-' + day;
}

export const generarCodigoValido = async function(){
    while(true){
        const rand = random(6, {letters: false});
        //comprobar que el codigo de grupo no exista
        let query = "SELECT * FROM grupos WHERE Codigo_grupo = ?";
        const rows = await db.query(query, [rand])
        if(rows.length == 0){
            return rand;
        }
    }
}