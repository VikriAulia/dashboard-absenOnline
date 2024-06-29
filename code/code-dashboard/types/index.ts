import { Icons } from '@/components/icons';
import { PrismaClient, pengguna_dashboard } from '@prisma/client';
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

export declare type DashboardUserType = pengguna_dashboard;

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

export declare type UserFormValuesTypes = z.infer<typeof userFormSchema>;
export declare type eventFormValuesTypes = z.infer<typeof eventFormSchema>;
