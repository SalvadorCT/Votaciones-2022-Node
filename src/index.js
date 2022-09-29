import  express  from "express";
import dotenv from "dotenv";
// Carga el archivo .env a las variables de entorno
// debe ir lo mas arriba posible
dotenv.config();

const server = express();
const port = process.env.PORT ?? 5000;



server.listen(port, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${port}`);
});