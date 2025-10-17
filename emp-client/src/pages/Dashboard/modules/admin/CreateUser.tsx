import type { CreateUserData } from '@models/createUserModel';
import { postUser } from '@services/userService';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { reset } from 'src/app/slices/createUserSlice';
import CreateUserForm from './CreateUserForm';

const CreateUser = () => {
  const postState = useAppSelector(state => state.createUser);
  const dispatch = useAppDispatch();

  const handleSubmit = (data: CreateUserData) => {
    console.log(data);
    const promise = dispatch(postUser(data));
    toast.promise(promise, { loading: 'Requesting new user...' });
  };

  useEffect(() => {
    if (postState.error) {
      console.log('Error state');
      if (postState.errorMsg) {
        toast.error(postState.errorMsg, {
          position: 'bottom-left',
        });
        dispatch(reset());
      }
    } else if (postState.success) {
      toast.success('User created successfully!', {
        position: 'bottom-left',
      });
    }
  }, [postState.error, postState.success, postState.errorMsg]);

  return (
    <div className='flex w-full justify-center'>
      <CreateUserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateUser;
