import { baseApi } from "@/shared/api";
import { User, UserId } from "./users.slice";
import { z } from "zod";

const UserDtoSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string()
})

export const usersApi = baseApi.injectEndpoints({
	endpoints: (create) => ({
		//first type for data returned, second type for query params
		getUsers: create.query<User[], void>({
			query: () => '/users',
			providesTags: ["Users"],
			//validate response from server
			transformResponse: (response: unknown) =>  UserDtoSchema.array().parse(response)
		}),
		getUser: create.query<User, UserId>({
			query: (userId) => `/users/${userId}`,
			providesTags: ["Users"],
			transformResponse: (response: unknown) =>  UserDtoSchema.parse(response)
		}),
		//инвалидируем кэш после мутации
		deleteUser: create.mutation<void, UserId>({
			query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
			invalidatesTags: ["Users"]
		})
	}),
		
	//for hot module replacement to work, we need to override the existing api
	overrideExisting: true
})
