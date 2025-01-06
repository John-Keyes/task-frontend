import getConfig from 'next/config'

const { publicRuntimeConfig: apiUrl } = getConfig()

export class APIClient {

	async Get(route: string, headers: HeadersInit) {
		const response = await fetch(`${apiUrl + route}`, {
			headers,
		})

		return await response.json();
	}

	async Post(route: string, body: Object, headers: HeadersInit) {
		const response = await fetch(`${apiUrl + route}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				...headers,
				"Content-type": "application/json"
			},
		})

		return await response.json();
	}
}
