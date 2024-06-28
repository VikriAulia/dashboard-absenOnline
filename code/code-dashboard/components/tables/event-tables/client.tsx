'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Event } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface EventProps {
  data: Event[];
}

export const EventClient: React.FC<EventProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Kegiatan Sekolah (${data.length})`}
          description="Kelola kegiatan untuk absen online sekolah"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/kegiatan/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Kegiatan Baru
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
