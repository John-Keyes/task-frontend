import getConfig from 'next/config'

const { publicRuntimeConfig: apiUrl } = getConfig()

export class APIClient {

	async Get(route: string, headers: HeadersInit) {
		const response = await fetch(`${apiUrl + route}`, {
			credentials: 'include',
			headers,
		})

		return await response.json()
	}

	async Post(route: string, body: Object, headers: HeadersInit) {
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
