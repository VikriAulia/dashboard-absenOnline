/*
  Warnings:

  - Added the required column `updatedAt` to the `jadwal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `kehadiran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `lokasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `qr_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jadwal" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "kehadiran" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lokasi" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "qr_code" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
