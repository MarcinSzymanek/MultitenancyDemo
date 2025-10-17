import { Field } from 'formik';

interface Props {
  id: string;
  placeholder?: string;
  isPassword?: boolean;
}

const FormField = ({ id, placeholder, isPassword }: Props) => {
  return (
    <Field
      id={id}
      className='border-light-gray bg-bg-primary shadow-light-gray inset-1 max-w-50 rounded-md border-2 px-4 shadow-sm inset-shadow-blue-500'
      name={id}
      placeholder={placeholder ? placeholder : id}
      type={isPassword ? 'password' : 'input'}
    />
  );
};

export default FormField;
