export default async function(path, params = {}) {
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
