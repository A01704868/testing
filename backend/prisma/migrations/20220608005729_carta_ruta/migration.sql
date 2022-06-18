-- CreateTable
CREATE TABLE "CartaRuta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "parqueId" INTEGER NOT NULL,

    CONSTRAINT "CartaRuta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartaRuta" ADD CONSTRAINT "CartaRuta_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
