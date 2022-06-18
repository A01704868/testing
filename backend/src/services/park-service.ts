import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getParks(){
    const allParks = await prisma.parque.findMany({
        orderBy: [
            {
              id: 'asc',
            },
          ],
        include: {
            // Here you can keep including data from other models
            horario: true,
            actividades: true
        },
    });
    return allParks;
}

getParks()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect;
  });

export default {
  getParks,
} as const;
