<template>
	<div class="login-scope">
		<p>Login</p>
		<form>
			<label for="token">
				Admin Token:
				<input type="password" id="token" required v-model="token">
			</label>
			<button @click="login(token)">
		</form>
	</div>
</template>

<script>
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
		data() {
			return {
				token: ''
			};
		},
		methods: {
			async login() {
				try {
					const res = await callApi('/admin/token/check');
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					console.log(`correct: ${res.content.correct}`);
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			}
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
.login-scope {
	margin: 1rem;
}
</style>
