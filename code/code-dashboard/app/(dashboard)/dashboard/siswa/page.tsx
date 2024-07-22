import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/siswa-tables/columns';
import { SiswaTable } from '@/components/tables/siswa-tables/siswa-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn, prisma } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Daftar peserta didik', link: '/dashboard/siswa' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = (page - 1) * pageLimit;
  const daftarSiswa = await prisma.siswa.findMany({
    skip: offset,
    take: pageLimit
  });

  const totalUsers = await prisma.siswa.count();
  const pageCount = Math.ceil(totalUsers / pageLimit);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Daftar Siswa (${totalUsers})`}
            description="Kelola data siswa..."
          />

          <Link
            href={'/dashboard/siswa/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SiswaTable
          searchKey="nama"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={daftarSiswa}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
