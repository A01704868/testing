import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


    export async function deleteHorarios(id:number) {

        const deleteHorario = await prisma.horario.delete({
            where:{
                id: id
            },

        });
        return deleteHorario;
        }
    


export default {
    deleteHorarios
} as const;