import { PrismaClient } from '@prisma/client';
import { Flora } from '@prisma/client';

const prisma = new PrismaClient();

export async function editFlora(flora: Flora): Promise<Flora> {
   
    const updatedFlora: Flora =
    await prisma.flora.update({
        data: {
            nombre: flora.nombre,
            imagen: flora.imagen,
            titulo: flora.titulo,
            descripcion: flora.descripcion,
        },

        where: {
            id: flora.id,
        }
    });

    return updatedFlora;

}


export default {
    editFlora
} as const;