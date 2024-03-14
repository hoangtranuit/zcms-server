import { Button, Result, SmileOutlined } from "@zcmjs/ui";

function HomePage() {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the operations!"
            extra={<Button type="primary">Next</Button>}
        />
    );
}

export default HomePage
