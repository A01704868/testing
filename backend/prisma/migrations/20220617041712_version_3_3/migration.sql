/*
  Warnings:

  - Added the required column `imagen` to the `ActividadParque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActividadParque" ADD COLUMN     "imagen" TEXT NOT NULL;
