import type {store} from "@/store/store";
import { Action, asyncThunkCreator, buildCreateSlice, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { extraArgument } from "./exra-argument";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  typeof extraArgument,
  Action<string>
>;

export type ThunkExtraArg = typeof extraArgument;

export type ThunkApiConfig = {
  state: AppState;
  dispatch: AppDispatch;
  extra: ThunkExtraArg;
};

export type ExtraArgument = typeof extraArgument;

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

export const createSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
})