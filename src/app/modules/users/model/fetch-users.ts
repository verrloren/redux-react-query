import { createAppAsyncThunk } from "@/shared/redux";
import { usersSlice } from "../users.slice";

//создаем префикс на основанрии которого async thunk Он создаст уникальные action types
export const fetchUsers = createAppAsyncThunk(
  "users/fetch",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: { refetch?: boolean } = {}, thunkAPI) =>
    thunkAPI.extra.api.getUsers(), {
			condition(params, { getState }) {
				const isIdle = usersSlice.selectors.selectIsFetchUsersIdle(getState());
				if (!params.refetch && !isIdle) return false
				return true
		}
});
