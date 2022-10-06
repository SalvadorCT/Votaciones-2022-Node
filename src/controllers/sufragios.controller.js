import conexion from '../prisma.js';

export const crearSufragio = async (req, res) => {
    const {candidatoId, votanteId} = req.body;
    // Buscar si el candidatoId existe
    // Buscar si el votanteId existe
    // Buscar si ya hay un sufragio con ese votanteId
    // Si no existe, crear el sufragio

    try{
        //hecho en clase
        
        // const candidato = await conexion.candidato.findUniqueOrThrow({
        //     where: {id: candidatoId},
        // });
        // const votante = await conexion.votante.findUniqueOrThrow({
        //     where: {id: votanteId},
        // });
        // const sufragio = await conexion.sufragio.findFirst({
        //     where: {votanteId,},
        // });

        // if(candidato === null){
        //     throw new Error('El candidato no existe');
        // }
        // if(votante === null){
        //     throw new Error('El votante no existe');
        // }
        // if(sufragio !== null){
        //     throw new Error('El votante ya ha votado');
        // }

        // return res.status(201).json({
        //     message: 'Sufragio creado exitosamente',
        //     content: resultado,
        // });

        //hecho por el profesor
        await conexion.candidato.findUniqueOrThrow({
            where: {id: candidatoId},
        });
        await conexion.votante.findUniqueOrThrow({
            where: {dni: votanteId},
        });
        const sufragio = await conexion.sufragio.findFirst({
            where: {votanteId,},
        });

        if(sufragio){
            return res.status(400).json({
                message: 'El votante ya ha votado',
                content:null,
            });
        }

        await conexion.sufragio.create({
            data: {
                candidatoId,
                votanteId,
            },
        });

        return res.status(201).json({
            message: 'Se registro el voto exitosamente',
        });

    }catch(error){
        return res.status(400).json({
            message: 'Error al realizar el sufragio',
            content: error.message,
        });
    }
}

export const listarResultados = async (req, res) => {
    //devolveremos los candidatos filtrados por region y su cantidad de votos
    // http://127.0.0.1:5000/sufragios/AREQUIPA
    // diferencia entre req.params y req.query
    // req.params: /sufragios/:region
    // req.query: /sufragios?region=AREQUIPA

    const {region} = req.params;
    console.log(region);

    // SELECT * FROM sufragios INNER JOIN candidatos ON sufragios.candidato_id = candidatos.id INNER JOIN regiones ON candidatos.region_id = regiones.id;

    const data = await conexion.sufragio.groupBy({
        by: ['candidatoId'],
        _count: {
            candidatoId: true,
        },
        where: {
            candidato: {
                region: {
                    nombre: region,
                },
            },
        },
    });

    return res.status(200).json({
        message: null,
        content: data,
    });
}
