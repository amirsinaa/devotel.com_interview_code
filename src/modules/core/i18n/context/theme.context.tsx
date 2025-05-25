import { createContext, useState, useEffect } from 'react'

export const ThemeCtx = createContext<{ dark: boolean; toggle(): void }>({
	dark: false,
	toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [dark, setDark] = useState(
		() => window.matchMedia('(prefers-color-scheme: dark)').matches,
	)
	const toggle = () => setDark((d) => !d)
	useEffect(() => {
		document.documentElement.dataset.theme = dark ? 'dark' : 'light'
	}, [dark])
	return (
		<ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>
	)
}
