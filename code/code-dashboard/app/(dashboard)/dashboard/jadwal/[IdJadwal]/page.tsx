import BreadCrumb from '@/components/breadcrumb';
import { JadwalForm } from '@/components/forms/jadwal-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

import { JadwalFormValuesTypes } from '@/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page({
  params
}: {
  params: { IdJadwal: string };
}) {
  const breadcrumbItems = [
    { title: 'Jadwal', link: '/dashboard/jadwal' },
    { title: 'Baru', link: '/dashboard/jadwal/create' }
  ];

  let formData: JadwalFormValuesTypes | null = null;
  // Ensure userIdJadwalString is not null and convert it to a number
  const IdJadwal = params.IdJadwal ? parseInt(params.IdJadwal, 10) : NaN;

  // console.log(`userIdJadwal: ${params.IdJadwal}`);
  // const userIdJadwal = 21;

  if (!isNaN(IdJadwal) && IdJadwal > 0) {
    try {
      console.log(`IdJadwal: ${IdJadwal}`);
      const jadwalData = await prisma.jadwal.findUnique({
        where: {
          id: IdJadwal
        }
      });

      if (jadwalData) {
        formData = {
          id: IdJadwal,
          nama: jadwalData?.nama as string,
          jamMulai: jadwalData?.mulai,
          jamSelesai: jadwalData?.selesai,
          keterangan: jadwalData?.keterangan
        };
      } else {
        toast({
          variant: 'destructive',
          title: 'User not found',
          description: 'No user found with the given IdJadwal.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with your request: ${error}`
      });
    }
  } else {
    console.warn(
      'InvalIdJadwal or missing userIdJadwalString, initializing with default values for a new user.'
    );
    formData = null;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <JadwalForm initialData={formData} key={null} />
      </div>
    </ScrollArea>
  );
}
