/*
  Warnings:

  - The primary key for the `kegiatan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kegiatan` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `kordinat_lokasi` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `qr_code` on the `kegiatan` table. All the data in the column will be lost.
  - You are about to drop the column `waktu` on the `kegiatan` table. All the data in the column will be lost.
  - The primary key for the `kehadiran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kehadiran` on the `kehadiran` table. All the data in the column will be lost.
  - The `status` column on the `kehadiran` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `pengguna_dashboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_pengguna` on the `pengguna_dashboard` table. All the data in the column will be lost.
  - The `peran` column on the `pengguna_dashboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PeranPengguna" AS ENUM ('ADMIN', 'GURU', 'USER');

-- CreateEnum
CREATE TYPE "StatusKehadiran" AS ENUM ('HADIR', 'ABSEN', 'TERLAMBAT', 'IZIN');

-- DropForeignKey
ALTER TABLE "kegiatan" DROP CONSTRAINT "kegiatan_id_pengguna_fkey";

-- DropForeignKey
ALTER TABLE "kehadiran" DROP CONSTRAINT "kehadiran_id_kegiatan_fkey";

-- AlterTable
ALTER TABLE "kegiatan" DROP CONSTRAINT "kegiatan_pkey",
DROP COLUMN "id_kegiatan",
DROP COLUMN "kordinat_lokasi",
DROP COLUMN "qr_code",
DROP COLUMN "waktu",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "id_jadwal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "id_lokasi" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id_pengguna" SET DEFAULT 0,
ADD CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "kehadiran" DROP CONSTRAINT "kehadiran_pkey",
DROP COLUMN "id_kehadiran",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusKehadiran" NOT NULL DEFAULT 'ABSEN',
ADD CONSTRAINT "kehadiran_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pengguna_dashboard" DROP CONSTRAINT "pengguna_dashboard_pkey",
DROP COLUMN "id_pengguna",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "peran",
ADD COLUMN     "peran" "PeranPengguna" NOT NULL DEFAULT 'USER',
ADD CONSTRAINT "pengguna_dashboard_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "peran_pengguna";

-- DropEnum
DROP TYPE "status_kehadiran";

-- CreateTable
CREATE TABLE "jadwal" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nama" TEXT NOT NULL,
    "mulai" TIME NOT NULL,
    "selesai" TIME NOT NULL,
    "keterangan" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lokasi" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "area" INTEGER NOT NULL,

    CONSTRAINT "lokasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_code" (
    "id" SERIAL NOT NULL,
    "id_kegiatan" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "qr_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qr_code_id_kegiatan_key" ON "qr_code"("id_kegiatan");

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_id_jadwal_fkey" FOREIGN KEY ("id_jadwal") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna_dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_id_lokasi_fkey" FOREIGN KEY ("id_lokasi") REFERENCES "lokasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_code" ADD CONSTRAINT "qr_code_id_kegiatan_fkey" FOREIGN KEY ("id_kegiatan") REFERENCES "kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran" ADD CONSTRAINT "kehadiran_id_kegiatan_fkey" FOREIGN KEY ("id_kegiatan") REFERENCES "kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
