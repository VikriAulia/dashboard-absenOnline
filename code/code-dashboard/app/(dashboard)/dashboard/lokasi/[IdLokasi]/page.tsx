import BreadCrumb from '@/components/breadcrumb';
import { LocationForm } from '@/components/forms/location-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

import { LocationFormValuesTypes } from '@/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page({
  params
}: {
  params: { IdLokasi: string };
}) {
  const breadcrumbItems = [
    { title: 'Lokasi', link: '/dashboard/lokasi' },
    { title: 'Baru', link: '/dashboard/lokasi/create' }
  ];

  let formData: LocationFormValuesTypes | null = null;
  // Ensure userIdLokasiString is not null and convert it to a number
  const IdLokasi = params.IdLokasi ? parseInt(params.IdLokasi, 10) : NaN;

  // console.log(`userIdLokasi: ${params.IdLokasi}`);
  // const userIdLokasi = 21;

  if (!isNaN(IdLokasi) && IdLokasi > 0) {
    try {
      console.log(`IdLokasi: ${IdLokasi}`);
      const locationData = await prisma.lokasi.findUnique({
        where: {
          id: IdLokasi
        }
      });

      if (locationData) {
        formData = {
          id: IdLokasi,
          nama: locationData?.nama as string,
          latitude: locationData?.latitude.toString(),
          longitude: locationData?.longitude.toString(),
          area: locationData?.area
        };
      } else {
        toast({
          variant: 'destructive',
          title: 'User not found',
          description: 'No user found with the given IdLokasi.'
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
      'InvalIdLokasi or missing userIdLokasiString, initializing with default values for a new user.'
    );
    formData = null;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <LocationForm initialData={formData} key={null} />
      </div>
    </ScrollArea>
  );
}
