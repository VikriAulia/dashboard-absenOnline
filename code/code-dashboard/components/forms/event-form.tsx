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
import { eventFormValuesTypes, eventFormSchema } from '@/types';
import axios from 'axios';
import { AlertModal } from '../modal/alert-modal';
import { Textarea } from '../ui/textarea';

interface EventFormProps {
  initialData: any | null;
}

export const EventForm: React.FC<EventFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit kegiatan' : 'Buat kegiatan baru';
  const description = initialData
    ? 'Edit data kegiatan.'
    : 'Buat data kegiatan baru';
  const toastMessage = initialData
    ? 'kegiatan sudah diupdate'
    : 'kegiatan baru berhasil dibuat.';
  const action = initialData ? 'Simpan perubahan' : 'Kirim';

  const defaultValues = initialData
    ? initialData
    : {
        judul: '',
        deskripsi: '',
        waktu: new Date(),
        kordinat_lokasi: '',
        qr_code: '',
        id_pengguna: ''
      };

  const form = useForm<eventFormValuesTypes>({
    resolver: zodResolver(eventFormSchema),
    defaultValues
  });

  const onSubmit = async (data: eventFormValuesTypes) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(`/api/kegiatan/edit/${initialData.id}`, data);
      } else {
        const res = await axios.post(`/api/kegiatan/create`, data);
        if (res.status !== 200) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.'
          });
        }
      }
      router.push(`/dashboard/kegiatan`);
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
      await axios.delete(`/api/kegiatan/delete/${params.userId}`);
      router.refresh();
      router.push(`/dashboard/kegiatan`);
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
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Kegiatan</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nama kegiatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kordinat_lokasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Koordinat Lokasi</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Koordinat lokasi kegiatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qr_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QR Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="QR code kegiatan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_pengguna"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Pengguna</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="ID pengguna"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Deskripsi kegiatan"
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
