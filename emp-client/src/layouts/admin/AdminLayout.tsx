import Header from '@components/Header';
import CreateUser from '@pages/Dashboard/modules/admin/CreateUser';
import type { PropsWithChildren } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-full'>
      <Header />
      <div className='flex h-full flex-row'>
        <AdminSidebar />
        {children}
        <CreateUser />
      </div>
    </div>
  );
};

export default AdminLayout;
