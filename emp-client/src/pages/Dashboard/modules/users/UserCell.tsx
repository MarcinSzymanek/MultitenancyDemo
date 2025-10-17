import { TableCell, TableRow } from '@components/ui/table';
import type { User } from '@models/userModels';

interface Props {
  id: number;
  user: User;
}

const UserCell = ({ id, user }: Props) => {
  console.log('User ccell rendering', id, user);
  return (
    <TableRow key={id}>
      <TableCell className='font-medium'>
        {user.firstName + ' ' + user.lastName}
      </TableCell>
      <TableCell>
        {
          <input
            className='disabled:opacity-100'
            type='checkbox'
            disabled={true}
            checked={user.isAdmin ? true : false}
          ></input>
        }
      </TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  );
};

export default UserCell;
