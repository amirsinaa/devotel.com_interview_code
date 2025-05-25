import { useEffect } from 'react'

export function useAutosave(
	schemaId: string,
	values: Record<string, unknown>,
	setValues: (v: Record<string, unknown>) => void,
) {
	useEffect(() => {
		const saved = localStorage.getItem(`draft:${schemaId}`)
		if (saved) setValues(JSON.parse(saved))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [schemaId])

	useEffect(() => {
		const id = setTimeout(() => {
			localStorage.setItem(`draft:${schemaId}`, JSON.stringify(values))
		}, 300)
		return () => clearTimeout(id)
	}, [schemaId, values])

	const clear = () => localStorage.removeItem(`draft:${schemaId}`)
	return clear
}
