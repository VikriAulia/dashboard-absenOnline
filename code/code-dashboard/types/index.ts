import { Icons } from '@/components/icons';
import { z } from 'zod';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

/* Disini defenisi scema untuk form */
export const userFormSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  role: z.enum(['ADMIN', 'GURU', 'USER']),
  name: z.string().min(3)
});

export const eventFormSchema = z.object({
  id_kegiatan: z.number().int().optional(), // Primary key, optional for create operations
  judul: z.string().min(3, 'Judul harus memiliki minimal 3 karakter'), // Title with minimum length
  deskripsi: z.string().optional().default('-'), // Optional description
  waktu: z.preprocess(
    (val) => {
      // Ensure the value is a valid date string or Date object
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date({ invalid_type_error: 'Waktu harus berupa tanggal yang valid' })
  ), // Date and time of the event
  kordinat_lokasi: z
    .string()
    .min(3, 'Koordinat lokasi harus memiliki minimal 3 karakter'), // Location coordinates with minimum length
  qr_code: z.string().optional().default('0'), // Optional QR code with default value
  id_pengguna: z.number().int() // User ID managing the event
});

export const locationFormSchema = z.object({
  id: z.number().int().optional(),
  nama: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  area: z
    .number()
    .int('Area must be an integer')
    .positive('Area must be a positive number')
    .describe('Area dalam Meter')
});


export const jadwalFormSchema = z.object({
  id: z.number().int().optional(), // Primary key, optional for create operations
  nama: z.string().min(3, 'Nama harus memiliki minimal 3 karakter'), // Name with minimum length
  jamMulai: z.preprocess(
    (val) => {
      // Ensure the value is a valid date string or Date object
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date({ invalid_type_error: 'jamMulai harus berupa tanggal yang valid' })
  ), // Start time of the schedule
  jamSelesai: z.preprocess(
    (val) => {
      // Ensure the value is a valid date string or Date object
      if (typeof val === 'string' || val instanceof Date) {
        return new Date(val);
      }
      return val;
    },
    z.date({ invalid_type_error: 'jamSelesai harus berupa tanggal yang valid' })
  ), // End time of the schedule
  keterangan: z
    .string()
    .min(1, 'Keterangan harus memiliki minimal 1 karakter')
    .optional() // Description with minimum length
});

export const qrcodeFormSchema = z.object({
  id: z.number().int().optional(), // Primary key, optional for create operations
  id_kegiatan: z.number().int(), // Unique event ID
  key: z.string().min(1, 'Key harus memiliki minimal 1 karakter') // Key with minimum length
});

export declare type UserFormValuesTypes = z.infer<typeof userFormSchema>;
export declare type eventFormValuesTypes = z.infer<typeof eventFormSchema>;
export declare type LocationFormValuesTypes = z.infer<
  typeof locationFormSchema
>;
export declare type JadwalFormValuesTypes = z.infer<typeof jadwalFormSchema>;
export declare type QrcodeFormValuesTypes = z.infer<typeof qrcodeFormSchema>;
