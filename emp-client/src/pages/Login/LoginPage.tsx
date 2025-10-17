import type { UserLoginData } from '@models/cserLoginModel';
import { postLogin } from '@services/loginService';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { PacmanLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate({ from: '/login' });

  const { authenticated, loading, error, errorMsg } = useAppSelector(
    state => state.auth
  );

  function handleLoginSubmit(data: UserLoginData) {
    dispatch(postLogin(data));
  }

  useEffect(() => {
    if (authenticated) {
      navigate({ to: '/dashboard' });
    } else if (error) {
      console.log('Display toast');
      if (errorMsg) {
        toast.error(errorMsg, {
          position: 'bottom-left',
        });
      }
    }
  }, [error, errorMsg, authenticated, navigate]);

  const loadingSpinner = () => {
    if (loading) {
      return (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-gray-800/50'>
          <PacmanLoader className='z-20 mb-30' />;
        </div>
      );
    }
  };

  return (
    <div className='block h-full w-full'>
      <div className='grid h-full grid-cols-24'>
        <div className='bg-bg-primary relative col-span-11 py-25 pl-40'>
          <h1 className='mb-20 text-left text-3xl font-bold'>EMP</h1>
          <p className='mb-5 text-left text-2xl font-bold'>
            Ready to get the work done?
          </p>
          <p className='text-lg'>Log in to your account</p>
          {loadingSpinner()}
          <LoginForm
            onLoginSubmit={(tenantId, email, password) =>
              handleLoginSubmit({ tenantId, email, password })
            }
          />
        </div>
        <div className='to-bg-secondary from-bg-gradient-end col-span-13 flex h-full justify-center bg-gradient-to-br'>
          <div className='my-35 justify-center px-25'>
            <h1 className='text-bg-primary text-5xl font-bold'>
              Managing work shifts made easy
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
