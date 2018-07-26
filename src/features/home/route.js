import {
  DefaultPage,
  NavBar,
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
    { path: '/navbar', name: 'Nav bar', component: NavBar },
  ],
};
