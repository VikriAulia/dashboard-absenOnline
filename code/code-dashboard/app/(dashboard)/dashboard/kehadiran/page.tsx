import BreadCrumb from '@/components/breadcrumb';
import { KehadiranClient } from '@/components/tables/kehadiran-tables/client';
import { prisma } from '@/lib/utils';
import { MergedKehadiranData } from '@/types';
import { PrismaClient, Prisma } from '@prisma/client';

const breadcrumbItems = [{ title: 'Kehadiran', link: '/dashboard/kehadiran' }];

/**
 * This function represents the main page component for the Kehadiran feature.
 * It fetches the list of kehadiran from the database and renders the BreadCrumb and KehadiranClient components.
 *
 * @returns {JSX.Element} - The JSX element representing the Kehadiran page.
 */
export default async function page() {
  /**
   * Fetch the list of kehadiran from the database using Prisma client.
   *
   * @type {Prisma.KehadiranFindManyArgs['where']} - The where clause for filtering kehadiran records.
   * @type {Prisma.KehadiranFindManyArgs['orderBy']} - The order by clause for sorting kehadiran records.
   * @type {Prisma.KehadiranFindManyArgs['skip']} - The number of records to skip.
   * @type {Prisma.KehadiranFindManyArgs['take']} - The number of records to take.
   * @type {Prisma.KehadiranFindManyArgs['include']} - The related records to include.
   *
   * @returns {Promise<Prisma.Kehadiran[]>} - The list of kehadiran records.
   */
  const daftarKehadiran = await prisma.kehadiran.findMany();
  const daftarSiswa = await prisma.siswa.findMany();
  const daftarKegiatan = await prisma.kegiatan.findMany();

  const mergeKehadiranData = (
    daftarKehadiran: {
      id: number;
      createAt: Date;
      updatedAt: Date;
      waktu_tanggal: Date;
      NISN: number;
      id_kegiatan: number;
      status: string;
    }[],
    daftarSiswa: {
      NISN: number;
      createdAt: Date;
      updatedAt: Date;
      nama: string;
      tanggal_lahir: Date;
      email: string;
      kelas: string;
      device_id: string;
    }[],
    daftarKegiatan: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      judul: string;
      deskripsi: string | null;
      id_jadwal: number;
      id_pengguna: number;
      id_lokasi: number;
    }[]
  ): MergedKehadiranData[] => {
    // Create lookup objects for siswa and kegiatan to optimize lookup
    const siswaLookup = Object.fromEntries(
      daftarSiswa.map((siswa) => [siswa.NISN, siswa])
    );
    const kegiatanLookup = Object.fromEntries(
      daftarKegiatan.map((kegiatan) => [kegiatan.id, kegiatan])
    );

    // Map over daftarKehadiran and merge with corresponding siswa and kegiatan
    const mergedData = daftarKehadiran.map((kehadiran) => {
      const siswa = siswaLookup[kehadiran.NISN];
      const kegiatan = kegiatanLookup[kehadiran.id_kegiatan];

      return {
        id: kehadiran.id,
        waktu_tanggal: kehadiran.waktu_tanggal,
        NISN: kehadiran.NISN,
        namaSiswa: siswa ? siswa.nama : 'Unknown Siswa',
        kelasSiswa: siswa ? siswa.kelas : 'Unknown Class',
        id_kegiatan: kehadiran.id_kegiatan,
        nama_kegiatan: kegiatan ? kegiatan.judul : 'Unknown Kegiatan',
        status: kehadiran.status
      };
    });

    return mergedData;
  };

  const mergedKehadiranData = mergeKehadiranData(
    daftarKehadiran,
    daftarSiswa,
    daftarKegiatan
  );

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <KehadiranClient data={mergedKehadiranData} />
      </div>
    </>
  );
}
