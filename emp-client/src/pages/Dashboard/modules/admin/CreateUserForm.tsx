import FormField from '@components/FormField';
import { createUserSchema, type CreateUserData } from '@models/createUserModel';
import { Field, Form, Formik } from 'formik';

interface Props {
  onSubmit: (data: CreateUserData) => void;
}

const initialValues: CreateUserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
};

const CreateUserForm = ({ onSubmit }: Props) => {
  return (
    <div className='mt-10 flex h-1/2 items-center rounded-2xl'>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log('SUBMIT FORMIK');
          onSubmit(values);
        }}
        validationSchema={createUserSchema}
      >
        {({ errors, touched }) => (
          <Form className='grid w-full grid-rows-2 items-center gap-4 text-gray-700'>
            <div className='grid grid-cols-2'>
              <FormField id='firstName' placeholder='First name' />
              {errors.firstName && touched.firstName ? (
                <div className='text-red-400'>{errors.firstName}</div>
              ) : null}
            </div>
            <div className='grid grid-cols-2'>
              <FormField id='lastName' placeholder='Last name' />
              {errors.lastName && touched.lastName ? (
                <div className='text-red-400'>{errors.lastName}</div>
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
            <div className='ml-2 flex flex-row space-x-5'>
              <Field type='checkbox' name='isAdmin' />
              <p>User is Admin</p>
            </div>
            <div className='mt-8 flex w-full items-center justify-self-center'>
              <button
                className='border-light-gray bg-bg-secondary w-full max-w-50 justify-self-start rounded-md p-2 text-white'
                type='submit'
              >
                {/* <div className='flex flex-row justify-center space-x-4'> */}
                {/* <AiFillLock size={25} />r */}
                <p className='font-bold'>Add User</p>
                {/* </div> */}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;
