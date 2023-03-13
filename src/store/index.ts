import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { usersAPI } from '../api/users';

export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware),
});

setupListeners(store.dispatch);
