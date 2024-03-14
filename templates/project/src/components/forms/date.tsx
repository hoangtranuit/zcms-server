import { theme, Col, Row, useForm, ZForm, ZFormSchema } from "@zcmjs/ui";
const { useToken } = theme;

function DateForm() {
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
            <Col>
                <ZForm
                    form={form}
                    schema={schema as any}
                    onMount={onMount}
                    onFinish={onFinish}
                    displayType="row"
                    labelWidth={200}
                    maxWidth={600}
                    column={2}
                    footer={{}}
                />
            </Col>
        </Row>
    )
}

const schema: ZFormSchema = {
    type: 'object',
    properties: {
        date: {
            title: 'DatePicker',
            format: 'date',
            type: 'string',
            required: true
        },
        date_time: {
            title: 'DatePicker[showTime]',
            format: 'dateTime',
            type: 'string',
            required: true
        },
        month: {
            title: 'Month Picker',
            format: 'date',
            type: 'string',
            required: true,
            props: {
                picker: "month"
            }
        },
        range: {
            title: 'RangePicker',
            format: 'date',
            type: 'range',
            required: true,
        },
        time: {
            title: 'TimePicker',
            format: 'time',
            type: 'string',
            required: true,
        },
    },
};


export default DateForm
