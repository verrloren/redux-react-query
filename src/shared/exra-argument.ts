import { baseApi as api } from "@/shared/api";
// import { router } from "./services/navigation"



const router = {
	push: (path: string) => {
			console.log(`Redirect to ${path}`);
		}
	};
			export const extraArgument = {
				api,
				router
			};