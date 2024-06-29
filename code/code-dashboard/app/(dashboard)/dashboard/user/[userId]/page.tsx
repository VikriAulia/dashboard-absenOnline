import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

import { UserFormValuesTypes } from '@/types';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Page({ params }: { params: { userId: string } }) {
  const breadcrumbItems = [
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
  ];

  let formData: UserFormValuesTypes | null = null;
  // Ensure userIdString is not null and convert it to a number
  const Id = params.userId ? parseInt(params.userId, 10) : NaN;
  console.log(`userId: ${params.userId}`);
  // const userId = 21;

  if (!isNaN(Id) && Id > 0) {
    try {
      console.log(`Id: ${Id}`);
      const userData = await prisma.pengguna_dashboard.findUnique({
        where: {
          id_pengguna: Id
        }
      });

      if (userData) {
        formData = {
          id: Id,
          email: userData?.email as string,
          name: userData?.nama as string,
          role: userData?.peran || 'USER'
        };
      } else {
        toast({
          variant: 'destructive',
          title: 'User not found',
          description: 'No user found with the given ID.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with your request: ${error}`
      });
    }
  } else {
    console.warn(
      'Invalid or missing userIdString, initializing with default values for a new user.'
    );
    formData = null;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          roles={[
            { _id: 'ADMIN', name: 'Admin' },
            { _id: 'GURU', name: 'Guru' },
            { _id: 'USER', name: 'Pengguna' }
          ]}
          initialData={formData}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
