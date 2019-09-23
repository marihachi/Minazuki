const lang =
	(window.navigator.languages && window.navigator.languages[0]) ||
	window.navigator.language ||
	window.navigator.userLanguage ||
	window.navigator.browserLanguage;
let id = 'en';
if (lang == 'ja') {
	id = 'ja';
}
const scriptElement = document.createElement('script');
scriptElement.setAttribute('src', `/resources/minazuki.${id}.js`);
scriptElement.setAttribute('defer', '');
document.head.appendChild(scriptElement);
