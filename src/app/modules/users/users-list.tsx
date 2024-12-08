import { useEffect, useState } from "react";
import { useAppSelector, useAppStore } from "../../hooks/react-redux";
import { UserId, usersSlice } from "./users.slice";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./model/fetch-users";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/shared/redux";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
	const dispatch = useDispatch<AppDispatch>();
	const appStore = useAppStore();
	const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUsersPending);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, appStore]);



  const sortedUsers = useAppSelector((state) =>	
    usersSlice.selectors.selectSortedUsers(state, sortType)
  );


	if(isPending) {
		return <div>Loading...</div>
	}

  return (
    <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setSortType("asc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Asc
            </button>
            <button
              onClick={() => setSortType("desc")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Desc
            </button>
          </div>
          <ul className="list-none">
            {sortedUsers.map((user) => (
              <UserListItem userId={user.id} key={user.id} />
            ))}
          </ul>
        </div>
    </div>
  );
}

function UserListItem({ userId }: { userId: UserId }) {
	const router = useRouter();
  const user = useAppSelector((state) => state.users.entities[userId]);
  const handleUserClick = () => {
    router.push(`/users/${userId}`);
  };
	if(!user) return null;
  return (
    <li key={user.id} className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
}

