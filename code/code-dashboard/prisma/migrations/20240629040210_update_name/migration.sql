/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "peran_pengguna" AS ENUM ('ADMIN', 'GURU', 'USER');

-- CreateEnum
CREATE TYPE "status_kehadiran" AS ENUM ('HADIR', 'ABSEN', 'TERLAMBAT', 'IZIN');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organizerId_fkey";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "DashboardUser";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Student";

-- DropEnum
DROP TYPE "AttendanceStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "pengguna_dashboard" (
    "id_pengguna" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "peran" "peran_pengguna" NOT NULL DEFAULT 'USER',
    "nama" TEXT NOT NULL,

    CONSTRAINT "pengguna_dashboard_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id_kegiatan" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "waktu" TIMESTAMP(3) NOT NULL,
    "kordinat_lokasi" TEXT NOT NULL,
    "qr_code" TEXT DEFAULT '0',
    "id_pengguna" INTEGER NOT NULL,

    CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("id_kegiatan")
);

-- CreateTable
CREATE TABLE "siswa" (
    "NISN" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("NISN")
);

-- CreateTable
CREATE TABLE "kehadiran" (
    "id_kehadiran" SERIAL NOT NULL,
    "waktu_tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "NISN" INTEGER NOT NULL,
    "id_kegiatan" INTEGER NOT NULL,
    "status" "status_kehadiran" NOT NULL DEFAULT 'ABSEN',

    CONSTRAINT "kehadiran_pkey" PRIMARY KEY ("id_kehadiran")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_dashboard_email_key" ON "pengguna_dashboard"("email");

-- CreateIndex
CREATE UNIQUE INDEX "siswa_email_key" ON "siswa"("email");

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna_dashboard"("id_pengguna") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran" ADD CONSTRAINT "kehadiran_NISN_fkey" FOREIGN KEY ("NISN") REFERENCES "siswa"("NISN") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kehadiran" ADD CONSTRAINT "kehadiran_id_kegiatan_fkey" FOREIGN KEY ("id_kegiatan") REFERENCES "kegiatan"("id_kegiatan") ON DELETE RESTRICT ON UPDATE CASCADE;
