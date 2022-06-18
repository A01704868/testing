import { PrismaClient, encargadoParque } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEncargado(id: number) {
  const encargado = await prisma.encargadoParque.findFirst({
    where: {
      parqueId: id,
    },
  });

  return encargado;
}

export async function createEncargado(encargado: encargadoParque) {
  const { nombre, telefono, parqueId } = encargado;

  const newEncargado: encargadoParque = await prisma.encargadoParque.create({
    data: {
      nombre: nombre,
      telefono: telefono,
      parqueId: parqueId,
    },
  });
  return newEncargado;
}

export async function updateEncargado(encargado: encargadoParque) {
  const { id, nombre, telefono } = encargado;

  const updateEncargado: encargadoParque = await prisma.encargadoParque.update({
    where: { id: id },
    data: {
      nombre: nombre,
      telefono: telefono
    },
  });

  return updateEncargado;
}

export async function deleteEncargado(id: number) {
  const borrarEncargado = await prisma.encargadoParque.delete({
    where: {
      id: id,
    },
  });
  return borrarEncargado;
}
