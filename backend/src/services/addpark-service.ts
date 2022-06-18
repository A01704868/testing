import { PrismaClient } from '@prisma/client';
import { Parque } from '@prisma/client';

const prisma = new PrismaClient();
//const prisma = new PrismaClient({ log: ['query'] })


export async function postParks(parque: Parque): Promise<Parque> {
    //Crear un registro
    console.log('EX: ',parque);
    const { 
        nombre,
        descripcion,
        imagen,
        direccion,
        latitud,
        longitud, 
        fechaDecreto,
        superficieTerrestre,
        superficieMarina,
        
         
    } = parque;

    const newParque: Parque =
     await prisma.parque.create({
        data: {
            nombre:  parque.nombre,
            descripcion: parque.descripcion,
            imagen: parque.imagen,
            direccion: parque.direccion,
            latitud: +parque.latitud,
            longitud: +parque.longitud,
            fechaDecreto: parque.fechaDecreto,
            superficieTerrestre: +parque.superficieTerrestre,
            superficieMarina: +parque.superficieMarina,
            clicks: 0,
            
        },
    });

    console.log('PRISMA: ', newParque);
    return newParque;
}


    


export default {
    postParks
} as const;