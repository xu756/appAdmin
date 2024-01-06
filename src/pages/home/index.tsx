import { useMount } from 'ahooks';
import { Button } from 'antd';
const Home = () => {
    useMount(() => {});
    return (
        <>
            <Button type="primary">Button</Button>
        </>
    );
};

export default Home;
