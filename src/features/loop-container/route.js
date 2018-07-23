// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Loop,
  RenderPoints,
} from './';

export default {
  path: 'loop-container',
  name: 'Loop container',
  childRoutes: [
    { path: 'loop', name: 'Loop', component: Loop, isIndex: true },
    { path: '/render-points', name: 'Render points', component: RenderPoints },
  ],
};
