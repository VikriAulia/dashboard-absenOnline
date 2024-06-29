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
  // Ensure userIdString is not null and convert it to a number
  const Id = params.eventId ? parseInt(params.eventId, 10) : NaN;
  console.log(`userId: ${params.eventId}`);
  // const userId = 21;

  if (!isNaN(Id) && Id > 0) {
    try {
      console.log(`Id: ${Id}`);
      const eventData = await prisma.kegiatan.findUnique({
        where: {
          id_kegiatan: Id
        }
      });

      if (eventData) {
        formData = {
          id_kegiatan: Id,
          judul: eventData?.judul as string,
          waktu: eventData?.waktu,
          kordinat_lokasi: eventData?.kordinat_lokasi,
          qr_code: eventData?.qr_code as string,
          deskripsi: eventData?.deskripsi as string,
          id_pengguna: eventData?.id_pengguna
        };
      } else {
        toast({
          variant: 'destructive',
          title: 'User not found',
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
        <EventForm initialData={formData} key={null} />
      </div>
    </ScrollArea>
  );
}
