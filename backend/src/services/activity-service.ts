import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getActivities(){
    const allActivities = await prisma.actividad.findMany();
    return allActivities;
}

getActivities()
    .catch( (e)=> {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect
    })

export default {
    getActivities
} as const;