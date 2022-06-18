import { PrismaClient } from '@prisma/client';
import { Fauna } from '@prisma/client';

const prisma = new PrismaClient();
//const prisma = new PrismaClient({ log: ['query'] })


export async function editFauna(fauna: Fauna): Promise<Fauna> {
    //Crear un registro
   

    const updateFauna: Fauna =
     await prisma.fauna.update({
        data: {
            nombre:  fauna.nombre,
            titulo: fauna.titulo,
            descripcion: fauna.descripcion,
            imagen: fauna.imagen,
            
        },
        where: {
            id: fauna.id,
        }
    });

    console.log('PRISMA: ', updateFauna);
    return updateFauna;
}


    


export default {
    editFauna
} as const;