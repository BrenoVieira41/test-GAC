/*
  Warnings:

  - Added the required column `status` to the `transfers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transfer_status_enum" AS ENUM ('pending', 'paid', 'refund');

-- AlterTable
ALTER TABLE "transfers" ADD COLUMN     "status" "transfer_status_enum" NOT NULL;
