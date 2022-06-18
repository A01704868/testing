import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


    export async function deleteAnuncio(id:number) {

        const deleteHorario = await prisma.anuncio.delete({
            where:{
                id: id
            },

        });
        return deleteHorario;
        }
    


export default {
    deleteAnuncio
} as const;