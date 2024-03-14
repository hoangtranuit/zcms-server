import { theme, Col, Row, useForm, ZForm, ZFormSchema } from "@zcmjs/ui";
const { useToken } = theme;

function SimpleForm() {
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
                    footer={{}}
                />
            </Col>
        </Row>
    )
}

const schema: ZFormSchema = {
    type: 'object',
    properties: {
        note: {
            title: 'Note',
            type: 'string',
            required: true
        },
        gender: {
            title: 'Gender',
            type: 'string',
            placeholder: 'Select an option',
            required: true,
            enum: ['male', 'female', 'other'],
            enumNames: ['male', 'female', 'other'],
        },
        other_gender: {
            title: 'Customize Gender',
            type: 'string',
            required: true,
            hidden: "{{formData.gender !== 'other'}}"
        },

    },
};


export default SimpleForm
