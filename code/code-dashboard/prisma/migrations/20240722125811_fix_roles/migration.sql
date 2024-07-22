/*
  Warnings:

  - The values [USER] on the enum `PeranPengguna` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PeranPengguna_new" AS ENUM ('ADMIN', 'GURU');
ALTER TABLE "pengguna_dashboard" ALTER COLUMN "peran" DROP DEFAULT;
ALTER TABLE "pengguna_dashboard" ALTER COLUMN "peran" TYPE "PeranPengguna_new" USING ("peran"::text::"PeranPengguna_new");
ALTER TYPE "PeranPengguna" RENAME TO "PeranPengguna_old";
ALTER TYPE "PeranPengguna_new" RENAME TO "PeranPengguna";
DROP TYPE "PeranPengguna_old";
ALTER TABLE "pengguna_dashboard" ALTER COLUMN "peran" SET DEFAULT 'GURU';
COMMIT;

-- AlterTable
ALTER TABLE "pengguna_dashboard" ALTER COLUMN "peran" SET DEFAULT 'GURU';
