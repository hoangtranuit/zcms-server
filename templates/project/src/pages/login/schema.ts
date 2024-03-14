import { ZFormSchema } from "@zcmjs/ui";

export default {
    type: 'object',
    properties: {
        username: {
            title: 'Username',
            labelWidth: 0,
            placeholder: 'admin or user',
            type: 'string',
            rules: [
                {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập'
                }
            ],
            props: {
                icon: `SmileOutlined`
            }
        },
        password: {
            title: 'Password',
            labelWidth: 0,
            type: 'string',
            format: 'password',
            placeholder: 'zcms',
            rules: [
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu'
                },
                // {
                //     pattern: "^(?=.*[A-Z])[A-Za-z0-9\d]{2,}$",
                //     message: "At least 2 characters and  one uppercase "
                // }
            ]
        },
        remember: {
            labelWidth: 0,
            type: 'boolean',
            title: 'Remember me!'
        }
    }

} as ZFormSchema;