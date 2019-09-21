import Vue from 'vue';
import app from './components/app';

// csrf token
const csrfMeta = document.getElementsByName('csrf').item(0);
let csrfToken = null;
if (csrfMeta) {
	csrfToken = csrfMeta.content;
}

const appElement = document.createElement('div');
appElement.setAttribute('id', 'app');
document.body.appendChild(appElement);

new Vue({
	el: '#app',
	data() {
		return {
			csrfToken
		};
	},
	components: { app },
	template: '<app />'
});

document.body.setAttribute('style', 'margin: 0');

const titleElement = document.createElement('title');
titleElement.innerText = 'admin page';
document.head.appendChild(titleElement);
