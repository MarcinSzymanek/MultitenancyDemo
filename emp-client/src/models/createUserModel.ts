import * as yup from 'yup';

export const createUserSchema = yup.object({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().required('required').email('Must be valid email'),
  password: yup.string().required('required'),
  isAdmin: yup.boolean().required(),
});

export type CreateUserData = yup.InferType<typeof createUserSchema>;

export function validateUser(data: CreateUserData): boolean {
  return createUserSchema.isValidSync(data);
}
