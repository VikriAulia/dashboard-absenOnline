import BreadCrumb from '@/components/breadcrumb';
import { EventClient } from '@/components/tables/event-tables/client';
import { PrismaClient, Prisma } from '@prisma/client';

const breadcrumbItems = [{ title: 'Kegiatan', link: '/dashboard/kegiatan' }];
const prisma = new PrismaClient();

export default async function page() {

  const event = await prisma.event.findMany()

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EventClient data={event} />
      </div>
    </>
  );
}
