import { useAppSelector } from "@/app/hooks/react-redux";
import { UserId, usersSlice } from "./users.slice";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUser } from "./model/fetch-user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux";
import { deleteUser } from "./model/delete-user";

export function UserInfo() {

	const router = useRouter();
	const { userId = ""  } = useParams<{ userId: UserId }>();
	const dispatch = useDispatch<AppDispatch>();
	const isPending = useAppSelector(usersSlice.selectors.selectIsFetchUserPending);
	const isDeletePending = useAppSelector(usersSlice.selectors.selectIsDeleteUserPending);
  const user = useAppSelector((state) => usersSlice.selectors.selectUserById(state, userId));

	useEffect(() => {
		dispatch(fetchUser(userId));
	}, [dispatch, userId])
	

  const handleBackButtonClick = () => {
    router.push("/users")
  };

	const handleDelete = () => {
		dispatch(deleteUser(userId)).then(() => router.push("/users"));
	}

	if (isPending || !user) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
		<p className="text-xl">{user.description}</p>
		<button disabled={isDeletePending} className="bg-red-500 hover:bg-red-700 text-white font-bold py-8 px-4" onClick={handleDelete}>Delete</button>
    </div>
	)
}

