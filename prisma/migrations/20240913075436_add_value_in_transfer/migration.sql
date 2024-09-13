/*
  Warnings:

  - Added the required column `value` to the `transfers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;
