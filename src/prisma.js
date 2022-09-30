import prisma from '@prisma/client';


export default new prisma.PrismaClient();

// Podemos exportar de dos maneras:
// export  const x = 10;
// export  default  x;
// Y para importar:
// import  { x } from "..";

// Nota: Solo se puede tener un default por archivo