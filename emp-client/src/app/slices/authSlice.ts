import {
  createSlice,
  type PayloadAction,
  type WritableDraft,
} from '@reduxjs/toolkit';
import { postLogin } from '@services/loginService';
import axios from 'axios';
import type { LoginServerResponse } from 'src/lib/types';

interface AuthState {
  loading: boolean;
  error: boolean;
  errorMsg?: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: false,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkStoredLogin(state) {
      // Check if token is in localStorage and use it if so
      // Otherwise reset auth state
      const token = localStorage.getItem(
        import.meta.env.VITE_STORAGE_JWT_TOKEN
      );
      console.log('checking stored login');
      if (token != null) {
        state.authenticated = true;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.log('Not found!');
        clearAuthState();
      }
    },
    clearAuthState(state) {
      localStorage.removeItem(import.meta.env.VITE_STORAGE_JWT_TOKEN);
      state.authenticated = false;
      state.error = false;
      state.errorMsg = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postLogin.pending, state => {
        console.log('Auth loading');
        state.loading = true;
      })
      .addCase(postLogin.rejected, (state, action) => {
        console.log('Auth rejected:', action.payload);
        if (action.payload != null) {
          const error = action.payload;
          if (error.status) handleErrorWithCode(state, error.status);
        }
        state.loading = false;
      })
      .addCase(
        postLogin.fulfilled,
        (state, action: PayloadAction<LoginServerResponse | undefined>) => {
          console.log('Auth fulfilled:', action.payload);
          if (
            action.payload != null &&
            action.payload.access_token.length > 0
          ) {
            state.error = false;
            state.authenticated = true;
            axios.defaults.headers.common['Authorization'] =
              `Bearer ${action.payload.access_token}`;

            localStorage.setItem(
              import.meta.env.VITE_STORAGE_JWT_TOKEN,
              action.payload.access_token
            );
          }
          state.loading = false;
        }
      );
  },
});

function handleErrorWithCode(
  state: WritableDraft<AuthState>,
  statusCode: number
) {
  state.error = true;
  state.authenticated = false;
  console.log('Code: ', statusCode);
  switch (statusCode) {
    case 400:
      state.errorMsg = 'Validation error. Is the email field a valid email?';
      return;
    case 403:
      state.errorMsg = 'Error authenticating user or password';
      return;
    default:
      console.error('unknown error');
      state.errorMsg = 'An unknown error has occurred';
  }
}

export const { checkStoredLogin, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
