/*
  Warnings:

  - Added the required column `titulo` to the `Anuncio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variante` to the `Anuncio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anuncio" ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "variante" TEXT NOT NULL;
