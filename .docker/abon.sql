-- Mulai transaksi
BEGIN;

-- Tipe enumerasi untuk peran pengguna
CREATE TYPE "peran_pengguna" AS ENUM (
    'admin',
    'guru',
    'pengguna'
);

-- Tipe enumerasi untuk status kehadiran
CREATE TYPE "status_kehadiran" AS ENUM (
    'hadir',
    'tidak_hadir',
    'terlambat',
    'ijin'
);

-- Tabel pengguna_dashboard
CREATE TABLE "pengguna_dashboard" (
    "id" SERIAL PRIMARY KEY,
    "waktu_dibuat" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "waktu_diperbarui" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "kata_sandi" VARCHAR(255) NOT NULL,
    "peran" "peran_pengguna" NOT NULL DEFAULT 'pengguna',
    "nama" VARCHAR(255)
);

-- Tabel acara
CREATE TABLE "acara" (
    "id" SERIAL PRIMARY KEY,
    "waktu_dibuat" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "waktu_diperbarui" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT,
    "tanggal" TIMESTAMPTZ NOT NULL,
    "lokasi" VARCHAR(255) NOT NULL,
    "kode_qr" VARCHAR(255) NOT NULL,
    "penyelenggara_id" INT NOT NULL,
    CONSTRAINT "fk_penyelenggara" FOREIGN KEY ("penyelenggara_id") REFERENCES "pengguna_dashboard" ("id") ON DELETE CASCADE
);

-- Tabel siswa
CREATE TABLE "siswa" (
    "id" SERIAL PRIMARY KEY,
    "waktu_dibuat" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "waktu_diperbarui" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "nama" VARCHAR(255) NOT NULL,
    "umur" INT NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "kelas" VARCHAR(255) NOT NULL,
    "id_perangkat" VARCHAR(255) NOT NULL
);

-- Tabel kehadiran
CREATE TABLE "kehadiran" (
    "id" SERIAL PRIMARY KEY,
    "tanggal" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "siswa_id" INT NOT NULL,
    "acara_id" INT NOT NULL,
    "status" "status_kehadiran" NOT NULL DEFAULT 'tidak_hadir',
    CONSTRAINT "fk_siswa" FOREIGN KEY ("siswa_id") REFERENCES "siswa" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_acara" FOREIGN KEY ("acara_id") REFERENCES "acara" ("id") ON DELETE CASCADE
);

-- Buat indeks untuk kolom foreign key untuk mempercepat kueri
CREATE INDEX "idx_acara_penyelenggara_id" ON "acara" ("penyelenggara_id");
CREATE INDEX "idx_kehadiran_siswa_id" ON "kehadiran" ("siswa_id");
CREATE INDEX "idx_kehadiran_acara_id" ON "kehadiran" ("acara_id");

-- Batasi nilai yang diizinkan untuk kolom peran di tabel pengguna_dashboard
ALTER TABLE "pengguna_dashboard" ADD CONSTRAINT "cek_peran_pengguna" CHECK ("peran" IN ('admin', 'guru', 'pengguna'));

-- Batasi nilai yang diizinkan untuk kolom status di tabel kehadiran
ALTER TABLE "kehadiran" ADD CONSTRAINT "cek_status_kehadiran" CHECK ("status" IN ('hadir', 'tidak_hadir', 'terlambat', 'ijin'));

-- commit the change (or roll it back later)
COMMIT;
