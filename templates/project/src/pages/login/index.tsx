import {
    Button,
    Flex, theme, Typography, ZForm, useForm, Row,
    Col,
    message,
} from '@zcmjs/ui';
import { FC, useEffect } from 'react';
import { useAuth } from '../../stores/user';
import { useNavigate } from 'react-router-dom';
import { APIService } from 'src/services';
import "./index.css";
import schema from './schema';
import app from "src/configs/app";

const { Title } = Typography

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
}

const Login: FC = () => {
    const { loggedIn, actions } = useAuth();
    const form = useForm()
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    const onFinish = async (values: FieldType) => {
        const { username, password } = values;
        const user = await APIService.login(username!, password!);
        console.log('user:' , user);
        
        if (!user.id) {
            error()
            return;
        }
        actions.login(user);
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sai tên đăng nhập hoặc mật khẩu',
        });
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (!loggedIn) return;
        navigate("/");
    }, [loggedIn])

    return (
        <Flex
            className="login-page" style={{ height: "100vh", backgroundColor: colorBgContainer }}
            vertical
            justify='center'
            align='center'>
            <Title style={{ marginBottom: 80 }}>{app.name}</Title>
            {contextHolder}
            <Row justify="center">
                <Col
                    style={{ width: 350 }}
                >
                    <ZForm
                        form={form}
                        schema={schema}
                        onFinish={onFinish}
                        size='large'
                        displayType='row'
                        labelWidth={0}
                        footer={() => {
                            return <Button
                                type='primary'
                                onClick={form.submit}
                                style={{ width: `100%` }}
                            >
                                Đăng nhập
                            </Button>
                        }}
                    />
                </Col>
            </Row>
        </Flex >
    );
};

export default Login;