//Verificar que ingresen datos por body
export const verificarCuerpoVacio = function (req, res, next) {
    console.log(req.body)
    console.log(Object.keys(req.body))
    if(req.method === "POST" || req.method === "PUT"){
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({mensaje: "Debes ingresar datos en el cuerpo de la petición para poder continuar"})
        }
    }
    next();
}