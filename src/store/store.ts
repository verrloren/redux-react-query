import {  countersReducer } from "@/app/modules/counters/counters.slice";
import { initialUsersList, usersSlice } from "@/app/modules/users/users.slice";
import {  configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
		[usersSlice.name]: usersSlice.reducer,
		counters: countersReducer,
	},
});

// Dispatch the action after the store is configured
store.dispatch(usersSlice.actions.stored({ users: initialUsersList }));

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
