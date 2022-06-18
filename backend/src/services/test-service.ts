
const prisma = new PrismaClient()

export async function GetAllTests () {
    return await prisma.test.findMany();
}