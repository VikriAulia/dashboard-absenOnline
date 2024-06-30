import BreadCrumb from '@/components/breadcrumb';
import { LocationClient } from '@/components/tables/location-tables/client';
import { PrismaClient, Prisma } from '@prisma/client';

const breadcrumbItems = [{ title: 'Lokasi', link: '/dashboard/lokasi' }];
const prisma = new PrismaClient();

export default async function page() {
  const daftarLokasi = await prisma.lokasi.findMany();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <LocationClient data={daftarLokasi}  />
      </div>
    </>
  );
}
