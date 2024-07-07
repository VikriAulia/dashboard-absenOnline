'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { QrCode, Kegiatan } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { QrcodeModal } from '@/components/modal/qrcode-modal';
import { useState } from 'react';

interface QrcodeProps {
  data: QrCode[];
  kegiatan: Kegiatan[];
}

interface MergedData {
  id: number;
  id_kegiatan: number;
  key: string;
  judul: string;
  deskripsi: string | null;
  // Add other fields as necessary
}

export const QrcodeClient: React.FC<QrcodeProps> = ({ data, kegiatan }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mergeData = (data: QrCode[], kegiatan: Kegiatan[]): MergedData[] => {
    return data.map((d) => {
      const matchingKegiatan = kegiatan.find((k) => k.id === d.id_kegiatan);
      return {
        id: d.id,
        id_kegiatan: d.id_kegiatan,
        key: d.key,
        judul: matchingKegiatan ? matchingKegiatan.judul : 'Unknown',
        deskripsi: matchingKegiatan
          ? matchingKegiatan.deskripsi
          : 'No Description'
      };
    });
  };

  const tableData = mergeData(data, kegiatan);

  return (
    <>
      <QrcodeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        dataKegiatan={kegiatan}
        initialData={null}
      />
      <div className="flex items-start justify-between">
        <Heading
          title={`Daftal QrCode (${data.length})`}
          description="Kelola Qrcode untuk kegiatan kesiswaan"
        />
        <Button className="text-xs md:text-sm" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Qrcode
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="judul" columns={columns} data={tableData} />
    </>
  );
};
