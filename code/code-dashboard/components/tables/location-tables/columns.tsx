'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Lokasi } from '@prisma/client';

export const columns: ColumnDef<Lokasi>[] = [
  {
    accessorKey: 'nama',
    header: 'NAMA'
  },
  {
    accessorKey: 'latitude',
    header: 'LATITUDE'
  },
  {
    accessorKey: 'longitude',
    header: 'LONGITUDE'
  },
  {
    accessorKey: 'area',
    header: 'RADIUS/AREA'
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
