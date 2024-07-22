'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Siswa } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Siswa>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'NISN',
    header: 'NISN'
  },
  {
    accessorKey: 'nama',
    header: 'NAMA',
  },
  {
    accessorKey: 'kelas',
    header: 'KELAS'
  },
  {
    accessorKey: 'device_id',
    header: 'ID PERANGKAT'
  },
  {
    accessorKey: 'tanggal_lahir',
    header: 'TANGGAL LAHIR'
  },
  {
    id: 'AKSI',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
