import { Avatar, Badge, Button, Popover, Space, Switch, Typography } from "@zcmjs/ui";
import {
    UserOutlined,
    NotificationOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useConfig } from "src/stores/app";
import { useAuth } from "src/stores/user";
import { useNavigate } from "react-router-dom";

const RightHeader = () => {
    const { isDarkTheme, actions } = useConfig();
    const { actions: authActions, user } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        authActions.logout();
        navigate("/login")
    }

    return (
        <Space size={32}>
            <Switch
                checkedChildren="Tối"
                unCheckedChildren="Sáng"
                value={isDarkTheme}
                onChange={actions.toggleTheme}
            />
            <Badge dot>
                <NotificationOutlined style={{ fontSize: "16px" }} />
            </Badge>
            <Popover
                content={
                    <Button
                        type="default"
                        danger={true}
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        Đăng xuất
                    </Button>
                }
                trigger="hover">
                <Space size={6}>
                    <Avatar shape="circle" icon={<UserOutlined />} />
                    <Typography.Text>{user.name}</Typography.Text>
                </Space>
            </Popover>
        </Space>
    )
}

export default RightHeader;