'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { DashboardUser } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<DashboardUser>[] = [
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
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'role',
    header: 'ROLE',
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    id: 'actions',
    header: "ACTION",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
