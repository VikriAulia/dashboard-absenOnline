'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { CellDownload } from './cell-download';
import { QrCode } from '@prisma/client';

interface MergedData {
  id: number;
  id_kegiatan: number;
  key: string;
  judul: string;
  deskripsi: string | null;
  // Add other fields as necessary
}

export const columns: ColumnDef<MergedData>[] = [
  {
    accessorKey: 'judul',
    header: 'JUDUL KEGIATAN KESISWAAN'
  },
  {
    accessorKey: 'deskripsi',
    header: 'DESKRIPSI'
  },
  {
    id: 'download',
    header: 'DOWNLOAD',
    cell: ({ row }) => <CellDownload data={row.original} />
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
