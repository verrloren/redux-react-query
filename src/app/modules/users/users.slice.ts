import { createAppSelector } from "@/app/hooks/react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/store/store";

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  description: string;
};

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[]; //для того чтобы выводить дефолтный список который пришел с бека
  selectedUserId: UserId | undefined;
};

export const initialUsersList: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `user${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for User ${index + 11}`,
}));

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    selected: (state, action: PayloadAction<{ userId: UserId }>) => {
      state.selectedUserId = action.payload.userId;
    },
    selectRemove: (state) => {
      state.selectedUserId = undefined;
    },
    stored: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("usersStored", (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;
      state.entities = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);
      state.ids = users.map((user) => user.id);
    });
  },
});

export const usersSelectors = {
  selectSelectedUserId: (state: AppState) => state.users.selectedUserId,
  selectSortedUsers: createAppSelector(
    (state: AppState) => state.users.ids,
    (state: AppState) => state.users.entities,
    (_: AppState, sort: "asc" | "desc") => sort,
    (ids, entities, sort) =>
      ids
        .map((id) => entities[id])
        .sort((a, b) => {
          if (sort === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
  ),
};