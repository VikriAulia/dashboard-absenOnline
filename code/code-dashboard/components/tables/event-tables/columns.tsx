'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

interface FormattedEvent {
  id: number;
  judul: string;
  deskripsi: string | null;
  jadwalMulai: string;
  jadwalSelesai: string;
  namaJadwal: string;
  namaPengelola: string;
  namaLokasi: string;
  id_jadwal: number;
  id_lokasi: number;
  id_pengguna: number;
  id_qrcode: number | undefined;
}

export const columns: ColumnDef<FormattedEvent>[] = [
  {
    accessorKey: 'judul',
    header: 'NAMA KEGIATAN'
  },
  { accessorKey: 'namaPengelola', header: 'PENGELOLA' },
  {
    accessorKey: 'jadwalMulai',
    header: 'JADWAL MULAI'
  },
  {
    accessorKey: 'jadwalSelesai',
    header: 'JADWAL SELESAI'
  },
  { accessorKey: 'namaJadwal', header: 'JADWAL' },
  {
    accessorKey: 'namaLokasi',
    header: 'LOKASI'
  },
  {
    accessorKey: 'deskripsi',
    header: 'DEKSPRIPSI KEGIATAN'
  },
  {
    id: 'actions',
    header: 'ACTION',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
