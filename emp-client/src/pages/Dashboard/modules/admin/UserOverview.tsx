import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { getUsers } from '@services/userService';
import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import UserCell from '../users/UserCell';

const UserOverview = () => {
  const usersState = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const tableContents = () => {
    console.log('Table contents');
    if (usersState.loading) {
      console.log('Table loading');
      return (
        <TableCell key={0} colSpan={3} className='text-center'>
          <BounceLoader color='#3b82f6' className='mx-auto my-8' />;
        </TableCell>
      );
    } else if (usersState.success) {
      console.log('Table success');
      return usersState.users.map((user, idx) => {
        return <UserCell id={idx} user={user} />;
      });
    }
    console.log('Why we here');
    return (
      <TableRow key={0}>
        <TableCell colSpan={3} className='text-center'>
          <BounceLoader
            color='#3b82f6'
            className='mx-auto my-8 justify-self-center'
          />
          ;
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table>
      {/* <TableCaption>Users</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Username</TableHead>
          <TableHead>Is Admin</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{tableContents()}</TableBody>
    </Table>
  );
};

export default UserOverview;
