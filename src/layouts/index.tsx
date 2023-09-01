import { useModel } from '@@/exports';
import { Outlet } from '@umijs/max';
import { useEffect } from 'react';

export default () => {
  const state = useModel('@@initialState');
  const init = () => {
    if (state.initialState?.user.id == 0) {
      window.location.reload();
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <Outlet />;
};
