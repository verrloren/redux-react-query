import { AppThunk } from "@/store/store";
import { UserId, usersSlice } from "../users.slice";

export const fetchUser = (userId: UserId): AppThunk => (dispatch, getState, { api }) => {
  const isPending = usersSlice.selectors.selectIsFetchUserPending(getState());
  if (isPending) return;
  dispatch(usersSlice.actions.fetchUserPending());

  api.getUser(userId)
    .then((user) => {
      dispatch(usersSlice.actions.fetchUserSuccess({ user }));
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
      dispatch(usersSlice.actions.fetchUserFailed());
    });
};