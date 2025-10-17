import * as yup from 'yup';

export const userLoginSchema = yup.object({
  tenantId: yup.string().required('Organization is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type UserLoginData = yup.InferType<typeof userLoginSchema>;

export function validateUser(data: UserLoginData): boolean {
  return userLoginSchema.isValidSync(data);
}
