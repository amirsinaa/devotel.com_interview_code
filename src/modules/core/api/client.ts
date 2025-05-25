export class ApiClient {
	private base = 'https://assignment.devotel.io'

	private async request<T>(
		path: string,
		options: RequestInit = {},
	): Promise<T> {
		const res = await fetch(`${this.base}${path}`, {
			headers: { 'Content-Type': 'application/json' },
			...options,
		})
		if (!res.ok) throw new Error(`API error ${res.status}`)
		return res.json() as Promise<T>
	}

	get<T>(path: string) {
		return this.request<T>(path)
	}

	post<T, B>(path: string, body: B) {
		return this.request<T>(path, {
			method: 'POST',
			body: JSON.stringify(body),
		})
	}
}

export const api = new ApiClient()
