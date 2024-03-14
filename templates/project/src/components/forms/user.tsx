import { theme, Col, Row, useForm, ZForm, ZFormSchema } from "@zcmjs/ui";
const { useToken } = theme;

function UserForm() {
    const form = useForm();
    const { token } = useToken()

    const onMount = () => {
    };

    const onFinish = (values) => {
        console.log("onFinish", values)
    }

    return (
        <Row
            style={{
                backgroundColor: token.colorBgContainer,
                padding: 24,
                borderRadius: 6,
            }}
            justify={"center"}
        >
            <Col
                style={{
                    width: 600
                }}
            >
                <ZForm
                    form={form}
                    schema={schema as any}
                    onMount={onMount}
                    onFinish={onFinish}
                    displayType="row"
                    labelWidth={200}
                    maxWidth={600}
                    validateMessages={validateMessages}
                    footer={{}}
                />
            </Col>
        </Row>
    )
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const schema: ZFormSchema = {
    type: 'object',
    properties: {
        name: {
            title: 'Name',
            type: 'string',
            required: true
        },
        email: {
            title: 'Email',
            type: 'string',
            rules: [
                { type: 'email' }
            ]
        },
        age: {
            title: 'Age',
            type: 'number',
            min: 0,
            max: 100,
            props: {
                style: { width: 100 }
            }
        },
        website: {
            title: 'Website',
            type: 'string',
        },
        intro: {
            title: 'Introduction',
            type: 'string',
            format: 'textarea'
        },
    },
};


export default UserForm
