'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { kegiatan } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<kegiatan>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'judul',
    header: 'NAMA KEGIATAN'
  },
  {
    accessorKey: 'judul',
    header: 'JADWAL KEGIATAN'
  },
  {
    accessorKey: 'kordinat_lokasi',
    header: 'KORDINAT LOKASI'
  },
  {
    accessorKey: 'deskripsi',
    header: 'DEKSPRIPSI KEGIATAN'
  },
  {
    accessorKey: 'qr_code',
    header: 'KODE QR'
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
