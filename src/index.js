import  express  from "express";
import dotenv from "dotenv";
import { candidatosRouter } from "./routes/candidatos.routes.js";
// Carga el archivo .env a las variables de entorno
// debe ir lo mas arriba posible
dotenv.config();

const server = express();
const port = process.env.PORT ?? 5000;

// Aceptar el body en formato json
server.use(express.json());
// Agregamos al middleware la informacion de las rutas del candidato
server.use(candidatosRouter);

server.listen(port, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${port}`);
});