import { configureStore } from '@reduxjs/toolkit';
import { countersReducer } from "@/app/modules/counters/counters.slice";
import { usersSlice } from "@/app/modules/users/users.slice";
import { extraArgument } from '@/shared/exra-argument';

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export default store;