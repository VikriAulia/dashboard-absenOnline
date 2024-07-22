import BreadCrumb from '@/components/breadcrumb';
import { EventClient } from '@/components/tables/event-tables/client';
import { PrismaClient } from '@prisma/client';

const breadcrumbItems = [{ title: 'Kegiatan', link: '/dashboard/kegiatan' }];
const prisma = new PrismaClient();

interface FormattedEvent {
  id: number;
  judul: string;
  deskripsi: string | null;
  jadwalMulai: string;
  jadwalSelesai: string;
  namaJadwal: string;
  namaPengelola: string;
  namaLokasi: string;
  id_jadwal: number;
  id_lokasi: number;
  id_pengguna: number;
  id_qrcode: number | undefined;
}

export default async function page() {
  const events = await prisma.kegiatan.findMany({
    include: {
      jadwal: true,
      lokasi: true,
      pengelola: true,
      qrcode: true
    }
  });

  const formattedEvents: FormattedEvent[] = events.map((event) => ({
    id: event.id,
    judul: event.judul,
    deskripsi: event.deskripsi,
    jadwalMulai: event.jadwal.mulai,
    jadwalSelesai: event.jadwal.selesai,
    namaJadwal: event.jadwal.nama,
    namaPengelola: event.pengelola.nama,
    namaLokasi: event.lokasi.nama,
    id_jadwal: event.id_jadwal,
    id_lokasi: event.id_lokasi,
    id_pengguna: event.id_pengguna,
    id_qrcode: event.qrcode?.id
  }));

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EventClient data={formattedEvents} />
      </div>
    </>
  );
}
