/*
  Warnings:

  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "location" VARCHAR(255) NOT NULL,
ADD COLUMN     "qrCode" VARCHAR(255) NOT NULL;
