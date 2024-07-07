import BreadCrumb from '@/components/breadcrumb';
import { QrcodeClient } from '@/components/tables/qrcode-tables/client';
import { PrismaClient } from '@prisma/client';

const breadcrumbItems = [{ title: 'QrCode', link: '/dashboard/qrcode' }];
const prisma = new PrismaClient();

export default async function page() {
  const daftarQrcode = await prisma.qrCode.findMany();
  const daftarKegiatan = await prisma.kegiatan.findMany();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <QrcodeClient data={daftarQrcode} kegiatan={daftarKegiatan} />
      </div>
    </>
  );
}
