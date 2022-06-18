-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Parque" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "fechaDecreto" TEXT NOT NULL,
    "superficieTerrestre" DOUBLE PRECISION NOT NULL,
    "superficieMarina" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstadoParque" (
    "parqueId" INTEGER NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "EstadoParque_pkey" PRIMARY KEY ("parqueId","estadoId")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionParque" (
    "parqueId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "RegionParque_pkey" PRIMARY KEY ("parqueId","regionId")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaParque" (
    "parqueId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoriaParque_pkey" PRIMARY KEY ("parqueId","categoriaId")
);

-- CreateTable
CREATE TABLE "Flora" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Flora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FloraParque" (
    "parqueId" INTEGER NOT NULL,
    "floraId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "FloraParque_pkey" PRIMARY KEY ("parqueId","floraId")
);

-- CreateTable
CREATE TABLE "Fauna" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Fauna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaunaParque" (
    "parqueId" INTEGER NOT NULL,
    "faunaID" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "FaunaParque_pkey" PRIMARY KEY ("parqueId","faunaID")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActividadParque" (
    "parqueId" INTEGER NOT NULL,
    "actividadId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ActividadParque_pkey" PRIMARY KEY ("parqueId","actividadId")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "parqueId" INTEGER NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "dias" TEXT NOT NULL,
    "horaAbrir" TEXT NOT NULL,
    "horaCerrar" TEXT NOT NULL,
    "parqueId" INTEGER NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EstadoParque" ADD CONSTRAINT "EstadoParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadoParque" ADD CONSTRAINT "EstadoParque_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionParque" ADD CONSTRAINT "RegionParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionParque" ADD CONSTRAINT "RegionParque_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaParque" ADD CONSTRAINT "CategoriaParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaParque" ADD CONSTRAINT "CategoriaParque_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloraParque" ADD CONSTRAINT "FloraParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloraParque" ADD CONSTRAINT "FloraParque_floraId_fkey" FOREIGN KEY ("floraId") REFERENCES "Flora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaunaParque" ADD CONSTRAINT "FaunaParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaunaParque" ADD CONSTRAINT "FaunaParque_faunaID_fkey" FOREIGN KEY ("faunaID") REFERENCES "Fauna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActividadParque" ADD CONSTRAINT "ActividadParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActividadParque" ADD CONSTRAINT "ActividadParque_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
