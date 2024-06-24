import BreadCrumb from '@/components/breadcrumb';
import { UserForm } from '@/components/forms/user-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'User', link: '/dashboard/user' },
    { title: 'Create', link: '/dashboard/user/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm
          roles={[
            { _id: 'ADMIN', name: 'Admin' },
            { _id: 'TEACHER', name: 'Guru' },
            { _id: 'USER', name: 'Pengguna' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
