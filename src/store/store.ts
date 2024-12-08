import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { countersReducer } from "@/app/modules/counters/counters.slice";
import { usersSlice } from "@/app/modules/users/users.slice";
import { api } from "@/shared/api";

const extraArgument = {
  api,
};

export const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    counters: countersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  typeof extraArgument,
  Action<string>
>;

export default store;