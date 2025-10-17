import { checkStoredLogin } from '@/app/slices/authSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import UserOverview from './modules/admin/UserOverview';

const contents = [<UserOverview />, <div>Under construction</div>];

const DashboardPage = () => {
  const contentIdx = useAppSelector(state => state.sidebar.selectedIdx);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkStoredLogin());
  }, [dispatch]);
  return (
    <div className='mx-15 my-15 flex w-full justify-center rounded-3xl'>
      {contents[contentIdx]}
    </div>
  );
};

export default DashboardPage;
