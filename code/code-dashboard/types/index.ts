import { Icons } from '@/components/icons';
import { PrismaClient, DashboardUser } from '@prisma/client';
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

export declare type DashboardUserType = DashboardUser; 

/* Disini defenisi scema untuk form */
export const userFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'TEACHER', 'USER']),
  name: z.string().min(3)
});

export declare type UserFormValues = z.infer<typeof userFormSchema>;