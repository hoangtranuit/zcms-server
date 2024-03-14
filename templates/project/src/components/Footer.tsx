import { Flex, Typography } from "@zcmjs/ui"
import app from "src/configs/app";

const Footer = () => {
    return <Flex justify="center" style={{ padding: 20 }}>
        <Typography.Text>{app.name} @ 2024</Typography.Text>
    </Flex>
}

export default Footer;