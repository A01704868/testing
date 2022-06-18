import { Parque, PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


    export async function deleteParks(id:number) {

        const deletePark = await prisma.parque.delete({
            where:{
                id: id
            },

        });
        return deletePark;
        }
    


export default {
    deleteParks
} as const;