import type { User } from '@models/userModels';
import { createSlice, type WritableDraft } from '@reduxjs/toolkit';
import { getUsers } from '@services/userService';

interface UsersState {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorMsg?: string;
  users: User[];
}

const initialState: UsersState = {
  loading: false,
  error: false,
  success: false,
  errorMsg: undefined,
  users: [],
};

function resetState(state: WritableDraft<UsersState>) {
  state.success = initialState.success;
  state.loading = initialState.loading;
  state.error = initialState.error;
  state.errorMsg = initialState.errorMsg;
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset(state) {
      resetState(state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        console.log('get users loading');
        state.success = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log('get users fulfilled');
        state.loading = false;
        state.success = true;
        state.error = false;
        if (action.payload) state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log('Received following payload: ', action.payload);
        state.error = true;
        state.loading = false;
        state.success = false;
        handleErrorWithCode(state, action.payload?.status);
      });
  },
});

function handleErrorWithCode(
  state: WritableDraft<UsersState>,
  statusCode: number | undefined
) {
  state.error = true;
  console.log('Code: ', statusCode);
  switch (statusCode) {
    case 400:
      state.errorMsg = 'Validation error. Is the email field a valid email?';
      return;
    case 401:
      state.errorMsg = 'Authentication error. Please log';
      return;
    case 403:
      state.errorMsg = 'Error authenticating user or password';
      return;
    default:
      console.error('unknown error');
      state.errorMsg = 'An unknown error has occurred';
  }
}

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
