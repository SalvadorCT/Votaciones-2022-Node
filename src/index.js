import  express  from "express";
import dotenv from "dotenv";
import cord from "cors";

import { candidatosRouter } from "./routes/candidatos.routes.js";
import { votantesRouter } from "./routes/votantes.routes.js";
import { sufragiosRouter } from "./routes/sufragios.routes.js";
// Carga el archivo .env a las variables de entorno
// debe ir lo mas arriba posible
dotenv.config();

const server = express();
const port = process.env.PORT ?? 5000;

//configuramos los cors
// sino le pasamos ningun parametro estamos
// dando acceso a cualquier cliente
server.use(
    cord({
        origin: ["http://localhost:5500","http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
    })
);
// Aceptar el body en formato json
server.use(express.json());
// Agregamos al middleware la informacion de las rutas del candidato
server.use(candidatosRouter);
server.use(votantesRouter);
server.use(sufragiosRouter)

server.listen(port, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${port}`);
});