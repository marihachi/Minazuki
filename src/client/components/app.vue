<template>
	<div class="app-scope">
		<p>Minazuki admin page</p>

		<h2>{%LicenseManagement%}</h2>
		<button @click="createLicense()">{%Create%}</button>

		<button @click="listLicenses()">{%Reload%}</button>
		<ul>
			<li v-for="license in licenses" :key="license.key">
				<p>key: {{ license.key }}</p>
				<p>enabled: {{ license.enabled }}</p>
				<p>activated: {{ license.activated }}</p>
				<button v-if="license.enabled" @click="disableLicense(license)">{%Disable%}</button>
				<button v-else @click="enableLicense(license)">{%Enable%}</button>
				<button @click="deleteLicense(license)">{%Delete%}</button>
			</li>
		</ul>
	</div>
</template>

<script>
	async function callApi(path, csrfToken, params = {}) {
		params._csrf = csrfToken;
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
					const res = await callApi('/admin/license/create', this.$root.csrfToken);
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
					const res = await callApi('/admin/license/list', this.$root.csrfToken);
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
					const res = await callApi('/admin/license/delete', this.$root.csrfToken, {
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
			async enableLicense(license) {
				try {
					const res = await callApi('/admin/license/enable', this.$root.csrfToken, {
						key: license.key
					});
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					// enable
					license.enabled = true;
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			},
			async disableLicense(license) {
				try {
					const res = await callApi('/admin/license/disable', this.$root.csrfToken, {
						key: license.key
					});
					if (!res.success) {
						alert('api error:', res.error.message);
						return;
					}
					// disable
					license.enabled = false;
				}
				catch (err) {
					alert(`request error: ${err.message || err}`);
				}
			}
		},
		created() {
			this.listLicenses();
		}
	};
</script>

<style lang="scss" scoped>
.app-scope {
	margin: 1rem;

	ul {
		padding: 0;

		li {
			list-style: none;
			border: 1px solid rgb(155, 155, 155);
			padding: 1rem;
			margin: 1rem 0;

			p {
				margin: 0;
			}
		}
	}
}
</style>
