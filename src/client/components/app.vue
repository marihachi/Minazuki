<template>
	<div>
		<p>Minazuki admin page</p>

		<h2>{%LicenseManagement%}</h2>
		<button @click="createLicense()">{%Create%}</button>

		<button @click="listLicenses()">{%Reload%}</button>
		<ul>
			<li v-for="license in licenses" :key="license.key">
				key: {{ license.key }}
				<button @click="deleteLicense(license)">{%Delete%}</button>
			</li>
		</ul>
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
				licenses: []
			};
		},
		methods: {
			async createLicense() {
				try {
					const res = await callApi('/admin/license/create');
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					this.licenses.push(res.content.license);
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			},
			async listLicenses() {
				try {
					const res = await callApi('/admin/license/list');
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					this.licenses = res.content.licenses;
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			},
			async deleteLicense(license) {
				try {
					const res = await callApi('/admin/license/delete', {
						key: license.key
					});
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					// remove the item from the license list
					const licenseIndex = this.licenses.findIndex(it => it.key == license.key);
					this.licenses.splice(licenseIndex, 1);
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			},
		},
		created() {
			this.listLicenses();
		}
	};
</script>

<style lang="scss" scoped>

</style>
