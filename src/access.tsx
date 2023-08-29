import { InitState } from '@/models/init';
import { history } from '@umijs/max';

export default function (state: InitState) {
  let user = false;
  let miniAdmin = false;
  if (history.location.pathname == '/login') {
    user = false;
  }
  if (state.user?.id == 0) {
    user = false;
  }
  if (state.user.group_code == 'admin') {
    miniAdmin = true;
  }
  return {
    user: user,
    public: true,
    miniAdmin: miniAdmin,
  };
}
