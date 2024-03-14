import { theme, Col, Row, useForm, ZForm, ZFormSchema } from "@zcmjs/ui";
const { useToken } = theme;

function OtherForm() {
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
        select: {
            title: 'Select',
            type: 'string',
            widget: 'select',
            enum: ['vn', 'usa'],
            enumNames: ['Việt Nam', 'USA'],
            default: 'vn',
            required: true,
            disabled: true,
        },
        multi_select: {
            title: 'Select[multiple]',
            type: 'array',
            widget: 'multiSelect',
            enum: ['green', 'blue', 'red',],
            enumNames: ['Green', 'Blue', 'Red'],
            required: true
        },
        radio_group: {
            title: 'Radio.Group',
            type: 'string',
            widget: 'radio',
            enum: ['1', '2', '3',],
            enumNames: ['Green', 'Blue', 'Red'],
            required: true
        },
        slider: {
            title: 'Slider',
            type: 'number',
            widget: 'slider',
            default: 80,
            required: true,
            props: {
                hideInput: true,
                marks: {
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F',
                }
            }
        },
        rate: {
            title: 'Rate',
            type: 'number',
            widget: 'rate',
            default: 3,
            required: true,
        },
        color: {
            title: 'ColorPicker',
            type: 'string',
            format: 'color',
            default: '#ffa500',
            required: true,
        },
        upload: {
            title: 'Upload',
            type: 'string',
            widget: 'upload',
            required: true,
            props: {
                action: '',
            }
        }
    },
};


export default OtherForm
