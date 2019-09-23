import adminRoute from './admin';
import notFoundRoute from './notfound';

export default function() {
	return [
		{ path: '/admin', component: adminRoute },
		{ path: '*', component: notFoundRoute }
	];
}
