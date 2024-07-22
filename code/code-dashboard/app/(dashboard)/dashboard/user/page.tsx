import BreadCrumb from '@/components/breadcrumb';
import { UserClient } from '@/components/tables/user-tables/client';
import { PrismaClient } from '@prisma/client';

const breadcrumbItems = [
  { title: 'Daftar akun absen online', link: '/dashboard/user' }
];
const prisma = new PrismaClient();

export default async function page() {
  const users = await prisma.penggunaDashboard.findMany();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
