import { handleApiResponseError } from '@/lib/utils/apiUtils';
import { simulateDelay } from '@/lib/utils/utils';
import type { CreateUserData } from '@models/createUserModel';
import type { User } from '@models/userModels';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { type AxiosResponse } from 'axios';
import { api_url_base } from 'src/lib/constants';
import type { ApiErrorResponse } from 'src/lib/types';

const usersUrlString = 'users';

export const postUser = createAsyncThunk<
  string | undefined,
  CreateUserData,
  { rejectValue: ApiErrorResponse }
>(
  'users/create',
  async (data: CreateUserData, thunkApi): Promise<string | undefined> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const response = await axios
        .post<
          string,
          AxiosResponse<string>,
          CreateUserData
        >(api_url_base + usersUrlString, data)
        .then(resp => resp.data);
      return response;
    } catch (error) {
      handleApiResponseError(error, thunkApi);
    }
  }
);

export const getUsers = createAsyncThunk<
  User[] | undefined,
  void,
  { rejectValue: ApiErrorResponse }
>('users/get', async (_, thunkApi): Promise<User[] | undefined> => {
  try {
    await simulateDelay(1000);

    const response = await axios
      .get<User[]>(api_url_base + usersUrlString)
      .then(resp => resp.data);
    return response;
  } catch (error) {
    handleApiResponseError(error, thunkApi);
  }
});
