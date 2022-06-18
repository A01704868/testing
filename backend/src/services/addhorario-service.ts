import { PrismaClient } from '@prisma/client';
import { Horario } from '@prisma/client';

const prisma = new PrismaClient();

export async function postHorario(horario: Horario): Promise<Horario> {
    console.log('EX: ',horario);

const newHorario: Horario = 
await prisma.horario.create({

    data: {
        dias: horario.dias,
        horaAbrir: horario.horaAbrir,
        horaCerrar: horario.horaCerrar,
        parque: {
            connect: {
                id: +horario.parqueId,
            }
        },
    },

});

return newHorario;
    
}

export default{
    postHorario
} as const;