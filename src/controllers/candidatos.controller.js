import conexion from "../prisma.js";

export const crearCandidato = async (req, res) => {
    const data = req.body;// data>{nombre:'a', apellido:'b'}

    try{
        const partidoPolitico = await conexion.partidoPolitico.findUniqueOrThrow({
            where: {id: data.partidoPoliticoId},
        });

        const region = await conexion.region.findUniqueOrThrow({
            where: {id: data.regionId},
        });
        const resultado = await conexion.candidato.create({
            data,
        });

        return res.status(201).json(resultado);
    }catch(error){
        console.log('mensaje',error.message);
        console.log('nombre',error.name);
        if (error.name === 'NotFoundError') {
            return res.status(400).json({
                message: 'Error al crear el candidato',
                content: error.message,
            });
        }
        return res.status(400).json({
            message: 'Error desconocido',
        })
    }
};
