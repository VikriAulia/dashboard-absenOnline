'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { MergedKehadiranData } from '@/types';

export const columns: ColumnDef<MergedKehadiranData>[] = [
  {
    accessorKey: 'NISN',
    header: 'NISN'
  },
  {
    accessorKey: 'namaSiswa',
    header: 'NAMA SISWA'
  },
  {
    accessorKey: 'kelasSiswa',
    header: 'KELAS'
  },
  {
    accessorKey: 'nama_kegiatan',
    header: 'NAMA KEGIATAN'
  },
  {
    accessorKey: 'status',
    header: 'STATUS KEHADIRAN'
  },
  {
    accessorKey: 'waktu_tanggal',
    header: 'WAKTU DAN TANGGAL'
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
