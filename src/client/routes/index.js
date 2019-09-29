import adminRoute from './admin.vue';
import notFoundRoute from './notfound.vue';

export default function() {
	return [
		{ path: '/admin', component: adminRoute },
		{ path: '*', component: notFoundRoute }
	];
}
