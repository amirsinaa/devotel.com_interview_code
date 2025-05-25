import { useContext } from 'react'
import { i18Context } from '../context/i18n.context'
import type { I18ni18Context } from '../context/i18n.context'

export const useT = (): I18ni18Context['t'] => {
	const ctx = useContext(i18Context).t
	if (!ctx) throw new Error('useT must be used within I18ni18Context')
	return ctx
}

export const useLang = (): I18ni18Context => {
	const ctx = useContext(i18Context)
	if (!ctx) throw new Error('useLang must be used within I18nProvider')
	return ctx
}
