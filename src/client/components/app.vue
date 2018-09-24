<template>
	<div>
		<p>minazuki admin page</p>

		<h2>{%License Creation%}</h2>
		<button @click="createLicense">{%Create%}</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			createLicense() {
				console.log('licence creation');
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
