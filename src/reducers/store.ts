import { configureStore } from '@reduxjs/toolkit';
import profile from './profileSlice';
import system from './systemSlice';
import network from './networkSlice';

export const store = configureStore({
  reducer: {
    profile,
    system,
    network,
  },
});

export type RootState = ReturnType<typeof store.getState>;
