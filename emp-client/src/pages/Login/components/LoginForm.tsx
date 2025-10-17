import FormField from '@components/FormField';
import { userLoginSchema } from '@models/cserLoginModel';
import { Form, Formik } from 'formik';
import { AiFillLock } from 'react-icons/ai';

interface Props {
  onLoginSubmit: (tenantId: string, email: string, password: string) => void;
}

const LoginForm = ({ onLoginSubmit }: Props) => {
  return (
    <div className='mt-10 flex h-1/2 items-center rounded-2xl'>
      <Formik
        initialValues={{ tenantId: '', email: '', password: '' }}
        onSubmit={values => {
          onLoginSubmit(values.tenantId, values.email, values.password);
        }}
        validationSchema={userLoginSchema}
      >
        {({ errors, touched }) => (
          <Form className='grid w-full grid-rows-2 items-center gap-4 text-gray-700'>
            <div className='grid grid-cols-2'>
              <FormField id='tenantId' placeholder='organization' />
              {errors.tenantId && touched.tenantId ? (
                <div className='text-red-400'>{errors.tenantId}</div>
              ) : null}
            </div>
            <div className='grid grid-cols-2'>
              <FormField id='email' />
              {errors.email && touched.email ? (
                <div className='text-red-400'>{errors.email}</div>
              ) : null}
            </div>
            <div className='grid grid-cols-2'>
              <FormField id='password' isPassword={true} />
              {errors.password && touched.password ? (
                <div className='text-red-400'>{errors.password}</div>
              ) : null}
            </div>
            <div className='mt-8 flex w-full items-center justify-self-center'>
              <button
                className='border-light-gray w-full max-w-50 justify-self-start rounded-md bg-green-500 p-2 text-black'
                type='submit'
              >
                <div className='flex flex-row justify-center space-x-4'>
                  <AiFillLock size={25} />
                  <p className='mr-5 font-bold'>Log in</p>
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
