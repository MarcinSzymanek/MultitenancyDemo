import DashboardPage from '@pages/Dashboard/DashboardPage';
import { createFileRoute } from '@tanstack/react-router';
import AdminLayout from 'src/layouts/admin/AdminLayout';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  );
}
