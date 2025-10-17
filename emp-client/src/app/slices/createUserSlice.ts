import { createSlice, type WritableDraft } from '@reduxjs/toolkit';
import { postUser } from '@services/userService';

interface CreateUserState {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorMsg?: string;
}

const initialState: CreateUserState = {
  loading: false,
  error: false,
  success: false,
  errorMsg: undefined,
};

function resetState(state: WritableDraft<CreateUserState>) {
  state.success = initialState.success;
  state.loading = initialState.loading;
  state.error = initialState.error;
  state.errorMsg = initialState.errorMsg;
}

const createUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    reset(state) {
      resetState(state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postUser.pending, state => {
        console.log('Post user loading');
        state.success = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(postUser.fulfilled, state => {
        console.log('Post user fulfilled');
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(postUser.rejected, (state, action) => {
        console.log('Received following payload: ', action.payload);
        state.error = true;
        state.loading = false;
        state.success = false;
        handleErrorWithCode(state, action.payload?.status);
      });
  },
});

function handleErrorWithCode(
  state: WritableDraft<CreateUserState>,
  statusCode: number | undefined
) {
  state.error = true;
  console.log('Code: ', statusCode);
  switch (statusCode) {
    case 400:
      state.errorMsg = 'Validation error. Is the email field a valid email?';
      return;
    case 403:
      state.errorMsg = 'Error authenticating user or password';
      return;
    case 409:
      state.errorMsg =
        'A user with this email already exists in this organization';
      return;
    default:
      console.error('unknown error');
      state.errorMsg = 'An unknown error has occurred';
  }
}

export const { reset } = createUserSlice.actions;
export default createUserSlice.reducer;
