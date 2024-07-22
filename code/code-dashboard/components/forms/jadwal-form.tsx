'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import { JadwalFormValuesTypes, jadwalFormSchema } from '@/types';
import axios from 'axios';
import { AlertModal } from '../modal/alert-modal';

interface JadwalFormProps {
  initialData: JadwalFormValuesTypes | null;
}

export const JadwalForm: React.FC<JadwalFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit jadwal' : 'Buat jadwal baru';
  const description = initialData
    ? 'Edit data jadwal.'
    : 'Buat data jadwal baru dashboard';
  const toastMessage = initialData
    ? 'jadwal sudah diupdate'
    : 'jadwal baru berhasil dibuat.';
  const action = initialData ? 'Simpan perubahan' : 'Kirim';

  const defaultValues = initialData
    ? {
        ...initialData,
        jamMulai: initialData.jamMulai.slice(0, 5), // Ensure format "HH:MM"
        jamSelesai: initialData.jamSelesai.slice(0, 5) // Ensure format "HH:MM"
      }
    : {
        nama: '',
        jamMulai: '08:00', // Default time
        jamSelesai: '17:00', // Default time
        keterangan: '-'
      };

  const form = useForm<JadwalFormValuesTypes>({
    resolver: zodResolver(jadwalFormSchema),
    defaultValues
  });

  const onSubmit = async (data: JadwalFormValuesTypes) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(`/api/jadwal/edit/${initialData.id}`, data);
      } else {
        const res = await axios.post(`/api/jadwal/create`, data);
        if (res.status !== 200) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.'
          });
        }
      }
      router.push(`/dashboard/jadwal`);
      router.refresh();
      toast({
        variant: 'default',
        title: toastMessage
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with your request: ${error}`
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/jadwal/delete/${params.locationId}`);
      router.refresh();
      router.push(`/dashboard/jadwal`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nama jadwal baru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jamMulai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jam Mulai Kegiatan</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      disabled={loading}
                      placeholder="Pilih jam mulai kegiatan"
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jamSelesai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jam Selesai Kegiatan</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      disabled={loading}
                      placeholder="Pilih jam selesai kegiatan"
                      value={field.value as string}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan Tambahan</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Masukan keterangan tambahan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
