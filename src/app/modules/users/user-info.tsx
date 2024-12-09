import { UserId } from "./users.slice";
import { useParams, useRouter } from "next/navigation";
import { usersApi } from "./api";
import { skipToken } from "@reduxjs/toolkit/query";

export function UserInfo() {
	const router = useRouter();
	const { userId = ""  } = useParams<{ userId: UserId }>();
	//if we don't have an id, we will use a skip token
	const { data: user, isLoading: isLoadingUser } = usersApi.useGetUserQuery(userId ?? skipToken);
	const [deleteUser, { isLoading: isLoadingDelete}] = usersApi.useDeleteUserMutation();

  const handleBackButtonClick = () => {
    router.push("/users")
  };

	const handleDelete = async () => {
		if(!userId) return
		 await deleteUser(userId);
		 router.push("/users");
	}

	if (isLoadingUser || !user) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
				disabled={isLoadingDelete}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
		<p className="text-xl">{user.description}</p>
		<button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-8 px-4" onClick={handleDelete}>Delete</button>
    </div>
	)
}

