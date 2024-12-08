import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppState } from "@/shared/redux";
import { createSelector } from "@reduxjs/toolkit";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppStore = () => useStore<AppState>();
export const createAppSelector = createSelector.withTypes<AppState>();