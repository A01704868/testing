import { PrismaClient } from '@prisma/client';
import { Fauna } from '@prisma/client';

const prisma = new PrismaClient();
//const prisma = new PrismaClient({ log: ['query'] })


export async function postFauna(fauna: Fauna): Promise<Fauna> {
    //Crear un registro
    console.log('EX: ',fauna);

    const newFauna: Fauna =
     await prisma.fauna.create({
        data: {
            nombre:  fauna.nombre,
            titulo: fauna.titulo,
            descripcion: fauna.descripcion,
            imagen: fauna.imagen,
            
        },
    });

    console.log('PRISMA: ', newFauna);
    return newFauna;
}


    


export default {
    postFauna
} as const;