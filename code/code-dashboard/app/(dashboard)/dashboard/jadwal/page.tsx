import BreadCrumb from '@/components/breadcrumb';
import { JadwalClient } from '@/components/tables/jadwal-tables/client';
import { PrismaClient } from '@prisma/client';

const breadcrumbItems = [{ title: 'Jadwal', link: '/dashboard/jadwal' }];
const prisma = new PrismaClient();

export default async function page() {
  const daftarJadwal = await prisma.jadwal.findMany();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <JadwalClient data={daftarJadwal} />
      </div>
    </>
  );
}
