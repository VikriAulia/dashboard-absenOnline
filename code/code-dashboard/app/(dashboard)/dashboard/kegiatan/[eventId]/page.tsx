import BreadCrumb from '@/components/breadcrumb';
import { EventForm } from '@/components/forms/event-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { eventFormValuesTypes } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page({
  params
}: {
  params: { eventId: string };
}) {
  const breadcrumbItems = [
    { title: 'User', link: '/dashboard/kegiatan' },
    { title: 'Create', link: '/dashboard/kegiatan/create' }
  ];

  let formData: eventFormValuesTypes | null = null;
  const Id = params.eventId ? parseInt(params.eventId, 10) : NaN;

  const jadwal = await prisma.jadwal.findMany();

  const lokasi = await prisma.lokasi.findMany();

  const pengguna = await prisma.penggunaDashboard.findMany();

  if (!isNaN(Id) && Id > 0) {
    try {
      const eventData = await prisma.kegiatan.findUnique({
        where: {
          id: Id
        }
      });

      if (eventData) {
        formData = {
          id_kegiatan: Id,
          judul: eventData.judul as string,
          deskripsi: eventData?.deskripsi as string,
          id_jadwal: eventData.id_jadwal.toString(),
          id_lokasi: eventData.id_lokasi.toString(),
          id_pengguna: eventData.id_pengguna.toString()
        };
      } else {
        toast({
          variant: 'destructive',
          title: 'Event not found',
          description: 'No event found with the given ID.'
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
      'Invalid or missing id_kegiatan, initializing with default values for a new kegiatan.'
    );
    formData = null;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <EventForm
          initialData={formData}
          dataJadwal={jadwal}
          dataLokasi={lokasi}
          dataPengguna={pengguna}
        />
      </div>
    </ScrollArea>
  );
}
