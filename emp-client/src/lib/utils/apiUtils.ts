import type { GetThunkAPI } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from 'src/lib/types';

export function handleApiResponseError(
  error: unknown,
  thunkApi: GetThunkAPI<{ rejectValue: ApiErrorResponse }>
) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    console.error(error.message);

    if (error.response) {
      console.log(error.response.data);
      throw thunkApi.rejectWithValue({
        message: error.message,
        status: error.response.status,
      });
    }

    throw thunkApi.rejectWithValue({
      message: `Axios Error without response: ${error.message}`,
    });
  }

  throw thunkApi.rejectWithValue({
    message: 'Unknown error occurred',
  });
}
