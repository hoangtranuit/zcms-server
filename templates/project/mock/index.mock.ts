import { MockHandler } from 'vite-plugin-mock-simple'
import json from "./json/app.json";

const users = {
    1: {
        id: 1,
        name: "Admin",
        avatar: "",
        access: "admin",
    },
    2: {
        id: 2,
        name: "User",
        avatar: "",
        access: "",
    }
}

let form = {
    agreement: true,
    confirm_password: "Aa123456",
    dateOfBirth: "2024-02-14",
    donation: 100000,
    email: "hoangtv3@vng.com.vn",
    gender: "male",
    intro: "this is intro",
    nickname: "hoang",
    password: "Aa123456",
    phone: "977943611",
    residence: "hcm",
    website: "hoang@adsad.vn",
}

export default [
    {
        delay: 200,
        pattern: '/api/get/config',
        method: 'POST, GET, DELETE, PUT, Patch',
        handle: (req, res) => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(json))
        }
    },
    {
        delay: 200,
        pattern: '/api/login',
        method: 'POST',
        handle: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200;

            req.on('data', (bodyString: string) => {
                const body: object = JSON.parse(bodyString)
                const { username, password } = body || {} as any;

                if ((username !== "admin" && username !== "user") || password !== "zcms") {

                    res.end(JSON.stringify({
                        mess: "Unauthorized",
                    }))
                    return
                }

                const admin = username === "admin";

                res.end(JSON.stringify(admin ? users[1] : users[2]))
            })
        }
    },
    {
        delay: 300,
        pattern: '/api/user/get',
        method: 'GET',
        handle: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200;
            const { id = 2 } = req.query || {};
            const user = users[id];
            res.end(JSON.stringify(user))
        }
    },
    {
        delay: 100,
        pattern: '/api/form/get',
        method: 'GET',
        handle: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200;
            res.end(JSON.stringify(form))
        }
    },
    {
        delay: 100,
        pattern: '/api/form/post',
        method: 'POST',
        handle: (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200;
            req.on('data', (bodyString: string) => {
                const body: any = JSON.parse(bodyString);
                form = body;
                res.end(JSON.stringify(body))
            })
        }
    }
] as MockHandler[]