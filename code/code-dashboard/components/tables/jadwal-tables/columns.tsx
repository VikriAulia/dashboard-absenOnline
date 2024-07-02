'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Jadwal } from '@prisma/client';

export const columns: ColumnDef<Jadwal>[] = [
  {
    accessorKey: 'nama',
    header: 'NAMA'
  },
  {
    accessorKey: 'mulai',
    header: 'JAM MULAI JADWAL'
  },
  {
    accessorKey: 'selesai',
    header: 'JAM SELESAI JADWAL'
  },
  {
    accessorKey: 'keterangan',
    header: 'KETERANGAN JADWAL'
  },
  {
    id: 'actions',
    header: 'AKSI',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
