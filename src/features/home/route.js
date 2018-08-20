import { DefaultPage, SideBar } from './';
import { Loop } from '../loop-container';
import { home } from 'react-icons-kit/feather/home';
import { activity } from 'react-icons-kit/feather/activity';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    {
      path: 'toehanke',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
      icon: home,
    },
    { path: '/sidebar', name: 'Side Bar', component: SideBar },
    { path: '/loop', name: 'Loop', component: Loop, icon: activity },
  ],
};
