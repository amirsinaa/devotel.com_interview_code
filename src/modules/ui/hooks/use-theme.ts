import { useContext } from 'react'
import { ThemeCtx, type ThemeContextType } from '../context/theme.context'

export const useTheme = (): ThemeContextType => {
	const ctx = useContext(ThemeCtx)
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
	return ctx
}
