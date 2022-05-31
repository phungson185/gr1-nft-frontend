import { configureStore } from '@reduxjs/toolkit';
import profile from './profileSlice';
import system from './systemSlice';

export const store = configureStore({
  reducer: {
    profile,
    system,
  },
});

export type RootState = ReturnType<typeof store.getState>;
