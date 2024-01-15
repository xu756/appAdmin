import { history, Outlet } from '@umijs/max';
import { useMount } from 'ahooks';

export default () => {
    useMount(() => {
        console.log('wxapp');
        history.push('/app/detail');
    });
    return <Outlet />;
};
