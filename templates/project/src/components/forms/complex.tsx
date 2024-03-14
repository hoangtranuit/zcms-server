import { theme, Col, Row, ZForm, ZFormSchema } from "@zcmjs/ui";
const { useToken } = theme;


function ComplexForm() {
    const { token } = useToken()

    return (
        <Row
            style={{
                backgroundColor: token.colorBgContainer,
                padding: 24,
                borderRadius: 6,
            }}
        >
            <Col span={24} >
                <ZForm
                    schema={schema}
                    api={{
                        initial: "/api/form/get",
                        submit: "/api/form/post",
                    }}
                    displayType="row"
                    column={2}
                    labelWidth={150}
                    onFinish={(v) => console.log(v)}
                />
            </Col>
        </Row>
    )
}


const schema: ZFormSchema = {
    type: 'object',
    properties: {
        color: {
            title: 'ColorPicker',
            type: 'string',
            format: 'color',
            default: '#ffa500',
            required: true,
        },
        email: {
            title: 'E-mail',
            type: 'string',
            format: 'email',
            required: true,
        },
        password: {
            title: 'Password',
            type: 'string',
            format: 'password',
            required: true,
            rules: [{
                "pattern": "^(?=.*[A-Z])[A-Za-z0-9\d]{8,}$",
                "message": "At least 8 characters and  one uppercase "
            }]
        },
        confirm_password: {
            title: 'Confirm Password',
            type: 'string',
            format: 'password',
            column: 2,
            required: true,
            // rules: [{
            //     "validator": function (_, m, { form }) { return m == form.getFieldValue('password') },
            //     "message": 'The new password that you entered do not match!'
            // }]
        },
        nickname: {
            title: 'Nickname',
            tooltip: 'What do you others call you?',
            type: 'string',
            required: true,
            column: 2,
        },
        residence: {
            title: 'Habitual Residence',
            type: 'string',
            widget: 'select',
            column: 2,
            required: true,
            enum: ["hcm", 'hn', 'dn'],
            enumNames: ["Hồ chí Minh", 'Hà Nội', 'Đà nẵng']
        },
        phone: {
            title: 'Phone Number',
            type: 'string',
            column: 2,
            required: true,
            props: {
                addonBefore: '+84',
            }
        },
        dateOfBirth: {
            title: 'Date of Birth',
            type: 'string',
            format: 'date',
            column: 2,
            required: true,
        },
        donation: {
            title: 'Donation',
            type: 'number',
            required: true,
            column: 2,
            min: 0,
            props: {
                addonAfter: 'VND',
            }
        },
        website: {
            title: 'Website',
            type: 'string',
            column: 2,
            required: true,
        },
        intro: {
            title: 'Intro',
            type: 'string',
            format: 'textarea',
            column: 2,
            props: {
                showCount: true,
                maxLength: 100,
                autoSize: {
                    maxRows: 10,
                    minRows: 3,
                }
            }
        },
        gender: {
            title: 'Gender',
            type: 'string',
            placeholder: 'Select an option',
            required: true,
            column: 2,
            enum: ['male', 'female', 'other'],
            enumNames: ['Male', 'Female', 'Other'],
        },
        editAddress: {
            title: "Edit Address",
            type: "boolean",
            widget: "switch",
            column: 1,
        },
        address: {
            type: 'object',
            // title: 'Address',
            displayType: 'row',
            theme: 'tile',
            column: 2,
            hidden: "{{formData.editAddress !== true}}",
            properties: {
                city: {
                    title: 'City',
                    description: 'or Province',
                    type: 'string',
                    required: true,
                    // column: 2,
                },
                district: {
                    title: 'District',
                    type: 'string',
                    // column: 2,
                },
                street: {
                    title: 'Street',
                    type: 'string',
                    column: 1,
                }
            }
        },
        agreement: {
            type: 'boolean',
            title: 'I have read the agreement',
            column: 1,
            rules: [{
                "validator": function (o, m) { return m === true },
                "message": "Should accept agreement"
            }]
        },
    },
};


export default ComplexForm
