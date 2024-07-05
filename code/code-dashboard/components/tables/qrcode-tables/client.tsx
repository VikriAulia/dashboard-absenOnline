'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { QrCode } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface QrcodeProps {
  data: QrCode[];
}

export const QrcodeClient: React.FC<QrcodeProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Daftal QrCode (${data.length})`}
          description="Kelola Qrcode untuk kegiatan kesiswaan"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/qrcode/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Qrcode
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nama" columns={columns} data={data} />
    </>
  );
};
