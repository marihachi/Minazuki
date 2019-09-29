<template>
	<div class="admin">
		<adminPage v-if="loginStatus" />
		<loginPage v-else />
	</div>
</template>
<script>
import adminPage from '../components/adminPage.vue';
import loginPage from '../components/loginPage.vue';

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
