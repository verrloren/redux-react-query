import { UserId } from "@/app/modules/users/users.slice";
import { z } from "zod";

const BASE_URL = "http://localhost:3000";

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const api = {
  getUsers: () => {
    return (
      fetch(`${BASE_URL}/users`)
        .then((res) => res.json())
        //мы делаем массив из схемы и валидируем все данные котоые пришли с сервера с помощь схемы
        .then((res) => UserDtoSchema.array().parse(res))
    );
  },
  getUser: (userId: UserId) => {
    return fetch(`${BASE_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((res) => UserDtoSchema.parse(res));
  },
  deleteUser: (userId: string) => {
    return fetch(`${BASE_URL}/users/${userId}`, { method: "DELETE" }).then(
      (res) => res.json()
    );
  },
};
