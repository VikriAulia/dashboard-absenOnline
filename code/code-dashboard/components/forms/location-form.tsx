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
import { LocationFormValuesTypes, locationFormSchema } from '@/types';
import axios from 'axios';
import { AlertModal } from '../modal/alert-modal';

interface LocationFormProps {
  initialData: LocationFormValuesTypes | null;
}

export const LocationForm: React.FC<LocationFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit lokasi' : 'Buat lokasi baru';
  const description = initialData
    ? 'Edit data lokasi.'
    : 'Buat data lokasi baru dashboard';
  const toastMessage = initialData
    ? 'lokasi sudah diupdate'
    : 'lokasi baru berhasil dibuat.';
  const action = initialData ? 'Simpan perubahan' : 'Kirim';

  const defaultValues: LocationFormValuesTypes = initialData
    ? initialData
    : {
        nama: '',
        latitude: '',
        longitude: '',
        area: 0
      };

  const form = useForm<LocationFormValuesTypes>({
    resolver: zodResolver(locationFormSchema),
    defaultValues
  });

  const onSubmit = async (data: LocationFormValuesTypes) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(`/api/lokasi/edit/${initialData.id}`, data);
      } else {
        const res = await axios.post(`/api/lokasi/create`, data);
        if (res.status !== 200) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.'
          });
        }
      }
      router.push(`/dashboard/lokasi`);
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
      await axios.delete(`/api/lokasi/delete/${params.userId}`);
      router.refresh();
      router.push(`/dashboard/lokasi`);
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
                      placeholder="Nama lokasi baru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Latitude"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Longitude"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Radius / Area (M)</FormLabel>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Radius dari titik absen dalam Meter"
                    {...field}
                  />
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
