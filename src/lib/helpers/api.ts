import getConfig from 'next/config'

const { publicRuntimeConfig: apiUrl } = getConfig()

export class APIClient {

	async get(route: string, headers: HeadersInit) {
		const rawResponse = await fetch(`${apiUrl + route}`, {
			credentials: 'include',
			headers,
		})

		return await rawResponse.json()
	}

	async post(route: string, body: Object, headers: HeadersInit) {
		const response = await fetch(`${apiUrl + route}`, {
			method: 'POST',
			body: JSON.stringify(body),
			credentials: 'include',
			headers: {
				...headers,
				'Content-type': 'application/json; charset=UTF-8'
			},
		})

		return await response.json();
	}
}
