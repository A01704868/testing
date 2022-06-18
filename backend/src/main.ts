import { PrismaClient, Role } from '@prisma/client'
import WeatherService from '@services/weather-service';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function GetAllUsers () {
    return await prisma.usuario.findMany({
        select: { password: true, nombre: true, email: true, role: true }
    });
}

// async function DeleteAllUsers () {
//     return await prisma.usuario.deleteMany();
// }

async function AddTestUsers () {
    return await prisma.usuario.createMany({
        data: [
            { email: "eduardo-larios@outlook.com", nombre: "Eduardo Larios", password: bcrypt.hashSync("hunter2", 10) },
            { email: "sofia-soto@gmail.com", nombre: "Sofia Soto", password: bcrypt.hashSync("Sofia1999.", 10) }
        ]
    })
}

(async () => {
    const result = await prisma.usuario.updateMany({
        data: {
            role: Role.ADMIN
        }
    })

    console.log(result)

})().then(() => console.log("Finished executing")).catch(e => console.error(e))