import { Flex, Spin } from '@zcmjs/ui';
import React from 'react';

const PageLoader: React.FC = () => (
    <Flex style={{ height: "100vh" }} justify='center' align='center'>
        <Spin tip="Loading" size="large" />
    </Flex>
);

export default PageLoader;