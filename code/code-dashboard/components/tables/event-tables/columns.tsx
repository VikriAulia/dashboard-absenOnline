'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Event } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: 'title',
    header: 'NAMA KEGIATAN'
  },
  {
    accessorKey: 'date',
    header: 'JADWAL KEGIATAN'
  },
  {
    accessorKey: 'location',
    header: 'KORDINAT LOKASI'
  },
  {
    accessorKey: 'description',
    header: 'DEKSPRIPSI KEGIATAN'
  },
  {
    accessorKey: 'qrCode',
    header: 'KODE QR'
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
