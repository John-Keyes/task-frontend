import getConfig from 'next/config'

const {publicRuntimeConfig: {apiUrl, clientUrl}} = getConfig();

export class APIClient {

	async Get(route: string, headers: HeadersInit) {
		const response = await fetch(`${apiUrl}${route}`, {
			method: "GET",
			headers: {
				...headers,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": clientUrl
			}
		})

		return await response.json();
	}

	async Post(route: string, body: Object, headers: HeadersInit) {
		const response = await fetch(`${apiUrl + route}`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				...headers,
				"Content-Type": "application/json",
            	"Access-Control-Allow-Origin": clientUrl
			},
		})

		return await response.json();
	}
}
