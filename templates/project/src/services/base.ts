import app from "src/configs/app"

export const API = {
    _fetch: async (path, {
        params = {},
        options = undefined
    } = {}) => {
        const response = await fetch(app.apiBaseUrl + path, options)
        const json = await response.json();
        return json;
    },

    get: async (path) => {
        const response = await API._fetch(path)
        return response;
    },

    post: async (path, { body }) => {
        const response = await API._fetch(path, {
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
        })

        return response
    }
}