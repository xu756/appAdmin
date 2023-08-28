import {useModel} from '@umijs/max';
import {useEffect} from 'react';

const HomePage = () => {
    const state = useModel('@@initialState');
    useEffect(() => {
        console.log(state);
    }, []);
    return (
        <>
            <h1>home</h1>
        </>
    );
};

export default HomePage;
