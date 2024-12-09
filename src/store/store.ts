import { configureStore } from '@reduxjs/toolkit';
import { countersReducer } from "@/app/modules/counters/counters.slice";
import { extraArgument } from '@/shared/exra-argument';
import { baseApi } from '@/shared/api';

export const store = configureStore({
  reducer: {
    counters: countersReducer,
		[baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }).concat(
			baseApi.middleware
		),
});

export default store;