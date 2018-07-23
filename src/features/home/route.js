import {
  DefaultPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'toehanke',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
