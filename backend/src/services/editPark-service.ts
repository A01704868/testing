import { PrismaClient } from '@prisma/client';
import { Parque } from '@prisma/client';

const prisma = new PrismaClient();

export async function editParks(parque: Parque): Promise<Parque> {
   
    const updatedParque: Parque =
    await prisma.parque.update({
        data: {
            nombre: parque.nombre,
            descripcion: parque.descripcion,
            imagen: parque.imagen,
            direccion: parque.direccion,
            latitud: parque.latitud,
            longitud: parque.longitud,
            fechaDecreto: parque.fechaDecreto,
            superficieTerrestre: parque.superficieTerrestre,
            superficieMarina: parque. superficieMarina,
        },

        where: {
            id: parque.id,
        }
    });

    return updatedParque;

}


export default {
    editParks
} as const;