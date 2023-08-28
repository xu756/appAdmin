import type { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.describe({
    key: 'plugin',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
};
