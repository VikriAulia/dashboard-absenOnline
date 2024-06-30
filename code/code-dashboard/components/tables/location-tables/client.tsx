'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Lokasi } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface LokasiProps {
  data: Lokasi[];
}

export const LocationClient: React.FC<LokasiProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Daftal Lokasi (${data.length})`}
          description="Kelola titik lokasi absen dan radius dari titik kordinat"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/lokasi/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah baru
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nama" columns={columns} data={data} />
    </>
  );
};
