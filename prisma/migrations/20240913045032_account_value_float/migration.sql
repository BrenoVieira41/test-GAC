/*
  Warnings:

  - Changed the type of `value` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "value",
ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;
