'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { CellDownload } from './cell-download';
import { QrCode } from '@prisma/client';

export const columns: ColumnDef<QrCode>[] = [
  {
    accessorKey: 'id_kegiatan',
    header: 'ID KEGIATAN KESISWAAN'
  },
  {
    accessorKey: 'key',
    header: 'KEY'
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
