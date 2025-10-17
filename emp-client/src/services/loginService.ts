import { handleApiResponseError } from '@/lib/utils/apiUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import type { ApiErrorResponse, LoginServerResponse } from 'src/lib/types';
import type { UserLoginData } from '../models/cserLoginModel';

const loginUrlString = 'auth/signin';

export const postLogin = createAsyncThunk<
  LoginServerResponse | undefined,
  UserLoginData,
  { rejectValue: ApiErrorResponse }
>('auth/login', async (data: UserLoginData, thunkApi) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Post LOGIN called');
    const response = await axios
      .post<string, AxiosResponse<LoginServerResponse>, UserLoginData>(
        import.meta.env.VITE_API_URL_BASE + loginUrlString,
        {
          tenantId: data.tenantId,
          email: data.email,
          password: data.password,
        }
      )
      .then(resp => resp.data);
    return response;
  } catch (error) {
    handleApiResponseError(error, thunkApi);
  }
});
