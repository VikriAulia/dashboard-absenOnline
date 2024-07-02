'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Jadwal } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface JadwalProps {
  data: Jadwal[];
}

export const JadwalClient: React.FC<JadwalProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Daftar Jadwal (${data.length})`}
          description="Kelola Jadwal"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/jadwal/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah baru
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nama" columns={columns} data={data} />
    </>
  );
};
