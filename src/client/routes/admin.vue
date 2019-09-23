<template>
	<div class="admin">
		<adminPage v-if="loginStatus" />
		<loginPage v-else />
	</div>
</template>
<script>
import adminPage from '../components/adminPage';
import loginPage from '../components/loginPage';

async function callApi(path, params = {}) {
	const resRaw = await fetch(path, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	});
	const res = await resRaw.json();
	return res;
}

export default {
	computed: {
		loginStatus() {
			return (this.$root.$data.token != null);
		}
	},
	components: {
		adminPage,
		loginPage
	}
}
</script>
