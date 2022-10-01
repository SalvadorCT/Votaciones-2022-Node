import conexion from '../prisma.js';
import fetch from 'node-fetch';

export const crearVotante = async (req, res) => {
    const { dni,region } = req.body;
    try {
        const respuesta = await fetch(`https://apiperu.dev/api/dni/${dni}`,{
        headers: {
            Authorization: `Bearer ${process.env.API_PERU_TOKEN}`,
            "Content-Type": "application/json",
        },
        method: 'GET',
        });
        const informacion = await respuesta.json();

        console.log(informacion);
        if(informacion.success){
            const {data} = informacion;
            const votanteCreado = await conexion.votante.create({
                data: {
                    apellido: data.apellido_paterno + " " + data.apellido_materno,
                    nombre: data.nombres,
                    dni: data.numero,
                    region,
                }, 
            })

            return res.status(201).json({
                message: 'Votante creado exitosamente, puede votar',
                content: votanteCreado,
            });
        }else{
            return res.status(400).json({
                message: 'Error al crear el votante',
                content: informacion.message,
            });
        }
        
    }catch(error){
        // message > mensaje opcional
        return res.status(400).json({
            message: 'Error al crear el votante',
            content: error.message,
        });
    }
};



