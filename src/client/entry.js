import Vue from 'vue';
import app from './components/app';

// csrf token
const csrfMeta = document.getElementsByName('csrf').item(0);
let csrfToken = null;
if (csrfMeta) {
	csrfToken = csrfMeta.content;
}

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
