import { PrismaClient } from '@prisma/client';
import { Horario } from '@prisma/client';

const prisma = new PrismaClient();

export async function editHorarios(horario: Horario): Promise<Horario> {
   
    const updatedHorario: Horario =
    await prisma.horario.update({
        data: {
            dias: horario.dias,
            horaAbrir: horario.horaAbrir,
            horaCerrar: horario.horaCerrar,
            parqueId: horario.parqueId,
        },

        where: {
            id: horario.id,
        }
    });

    return updatedHorario;

}

export default {
    editHorarios
} as const;