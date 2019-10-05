import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import routes from './routes';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './resources/normalize.css';
import './resources/skeleton.css';

faLibrary.add(faPlus);
faLibrary.add(faSyncAlt);
Vue.component('v-fa', FontAwesomeIcon);

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

const router = new VueRouter({
	mode: 'history',
	routes: routes()
});

const token = localStorage.getItem('token');

Vue.use(VueRouter);
new Vue({
	el: '#app',
	router,
	data() {
		return {
			token: token
		};
	},
	components: { App },
	template: '<App />'
});

document.body.setAttribute('style', 'margin: 0');

const titleElement = document.createElement('title');
titleElement.innerText = 'Minazuki';
document.head.appendChild(titleElement);
