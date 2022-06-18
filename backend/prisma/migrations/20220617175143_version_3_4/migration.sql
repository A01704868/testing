/*
  Warnings:

  - Added the required column `titulo` to the `Fauna` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Flora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fauna" ADD COLUMN     "titulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Flora" ADD COLUMN     "titulo" TEXT NOT NULL;
