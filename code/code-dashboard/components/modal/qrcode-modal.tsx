'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Kegiatan, QrCode } from '@prisma/client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

// Define form values type
type QrcodeFormValuesTypes = z.infer<typeof qrcodeFormSchema>;

interface qrData {
  id: number;
  id_kegiatan: number;
  // Add other fields as necessary
}

// Define schema using zod
const qrcodeFormSchema = z.object({
  id_kegiatan: z.number().int().nullable()
});

interface QrcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataKegiatan: Kegiatan[];
  initialData: qrData | null;
}

export const QrcodeModal: React.FC<QrcodeModalProps> = ({
  isOpen,
  onClose,
  dataKegiatan,
  initialData
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Titles, descriptions, and messages
  const title = initialData ? 'Edit QR Code' : 'Buat QR Code baru';
  const description = initialData
    ? 'Edit data QR Code.'
    : 'Buat data QR Code baru di dashboard';
  const toastMessage = initialData
    ? 'QR Code telah diupdate.'
    : 'QR Code baru berhasil dibuat.';
  const action = initialData ? 'Simpan perubahan' : 'Tambah';

  // Default form values
  const defaultValues: QrcodeFormValuesTypes = initialData
    ? { id_kegiatan: initialData.id_kegiatan }
    : { id_kegiatan: null };

  // Initialize form with react-hook-form and zod
  const form = useForm<QrcodeFormValuesTypes>({
    resolver: zodResolver(qrcodeFormSchema),
    defaultValues
  });

  const onConfirm = async (data: QrcodeFormValuesTypes) => {
    setLoading(true);

    const apiUrl = initialData
      ? `/api/qrcode/update/${initialData.id}` // Update URL, adjust path accordingly
      : '/api/qrcode/create'; // Create URL, adjust path accordingly

    try {
      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        setLoading(false);
        onClose();
        toast({
          title: 'Success!',
          description: toastMessage,
          duration: 5000
        });
      } else {
        setLoading(false);
        onClose();
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);

        toast({
          title: 'Error!',
          description: `Gagal ${
            initialData ? 'mengupdate' : 'membuat'
          } QR Code. ${error.message}`,
          duration: 5000
        });
      } else {
        console.error('Error NON AXIOS submitting form:', error);
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleFormSubmit = (data: QrcodeFormValuesTypes) => {
    if (data.id_kegiatan === null) {
      form.setError('id_kegiatan', {
        type: 'manual',
        message: 'Silakan pilih kegiatan.'
      });
      return;
    }
    onConfirm(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="w-full space-y-8"
        >
          <div className="flex">
            <FormField
              control={form.control}
              name="id_kegiatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Kegiatan</FormLabel>
                  <FormControl>
                    <Controller
                      name="id_kegiatan"
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          disabled={loading}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value ? String(field.value) : ''}
                          defaultValue={field.value ? String(field.value) : ''}
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={
                                field.value ? String(field.value) : ''
                              }
                              placeholder="Pilih kegiatan"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {dataKegiatan.map((kegiatan) => (
                              <SelectItem
                                key={kegiatan.id}
                                value={String(kegiatan.id)}
                              >
                                {kegiatan.judul}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.id_kegiatan?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button disabled={loading} type="submit" variant="default">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
