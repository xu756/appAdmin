import './loading.css';
import { useMount } from 'ahooks';
const Loading = () => {
    useMount(() => {
        console.log('loading');
    });
    return <>加载...</>;
};

export default Loading;
