import { AppThunk } from "@/shared/redux";
import { UserId, usersSlice } from "../users.slice";
import { fetchUsers } from "./fetch-users";

export const deleteUser =
  (userId: UserId): AppThunk<Promise<void>> =>
  async (dispatch, _, { api, router }) => {
    dispatch(usersSlice.actions.deleteUserPending());
    try {
			//because we are using the router in the thunk, we can do await like so
      await api.deleteUser(userId);
			await router.push("/users");
      await dispatch(usersSlice.actions.deleteUserSuccess({ userId }));

      //мы хотим сделать перезапрос после того как пользователь был удален
      dispatch(fetchUsers({ refetch: true }));
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(usersSlice.actions.deleteUserFailed());
    }
  };
