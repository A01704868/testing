import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


    export async function deleteCarts(id:number) {

        const deleteCart = await prisma.cartaRuta.delete({
            where:{
                id: id
            },

        });
        return deleteCart;
        }
    


export default {
    deleteCarts
} as const;