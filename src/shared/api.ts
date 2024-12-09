
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	//после удаления пользователя, ничего не произойдет потому что данные закэшированы и нам показываеются данные из кэша
	//этот кэш является невалидным, тоесть не совпадает с данными на сервере, соответственно нужно сделать перезапрос
	//поэтому нужно инвалидировать кэш, при помощи тегов. мы помечаем тегами данные которые нужно перезапросить после мутации
	tagTypes: ["Users"],
	endpoints: () => ({})
})
