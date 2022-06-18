/*
  Warnings:

  - Added the required column `clicks` to the `Parque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parque" ADD COLUMN     "clicks" INTEGER NOT NULL;
