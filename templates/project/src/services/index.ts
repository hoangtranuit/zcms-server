import { API } from "./base";
import app from "src/configs/app"

export const APIService = {
    getConfig: async () => {
        const response = await API.get(app.layout.api)
        return response;
    },

    login: async (username: string, password: string) => {
        const response = await API.post(app.auth.api.login, {
            body: {
                username,
                password,
            }
        });

        return response.data;
    },

    getUser: async (id: number) => {
        const response = await API.get(`${app.auth.api.profile}?id=${id}`)
        return response.data;
    },
}