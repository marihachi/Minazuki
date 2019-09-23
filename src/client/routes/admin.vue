<template>
	<div class="admin">
		<adminPage v-if="loginStatus" />
		<loginPage v-else />
	</div>
</template>
<script>
import adminPage from '../components/adminPage';
import loginPage from '../components/loginPage';

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
