-- CreateTable
CREATE TABLE "encargadoParque" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "parqueId" INTEGER NOT NULL,

    CONSTRAINT "encargadoParque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "encargadoParque_parqueId_key" ON "encargadoParque"("parqueId");

-- AddForeignKey
ALTER TABLE "encargadoParque" ADD CONSTRAINT "encargadoParque_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
