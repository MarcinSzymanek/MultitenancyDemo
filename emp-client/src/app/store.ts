import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import createUserReducer from './slices/createUserSlice';
import sidebarReducer from './slices/sidebarSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    createUser: createUserReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
