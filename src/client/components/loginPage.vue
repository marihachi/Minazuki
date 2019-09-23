<template>
	<div class="login-scope">
		<p>Login</p>
		<label for="token">
			Admin Token:
			<input type="password" id="token" required v-model="token">
		</label>
		<button @click="login()">login</button>
	</div>
</template>

<script>
import callApi from '../modules/callApi';

export default {
	data() {
		return {
			token: ''
		};
	},
	methods: {
		async login() {
			try {
				const res = await callApi('/admin/license/list', {
					token: this.token,
					limit: 0
				});
				if (!res.success) {
					if (res.error.message == 'not_authenticated') {
						alert('incorrect credentials');
					}
					else {
						alert('api error:', res.error.message);
					}
					return;
				}
				localStorage.setItem('token', this.token);
				this.$root.$data.token = this.token;
			}
			catch (err) {
				alert(`request error: ${err.message || err}`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.login-scope {
	margin: 1rem;
}
</style>
