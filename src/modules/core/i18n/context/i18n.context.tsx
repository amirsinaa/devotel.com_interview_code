import { createContext, useState } from 'react'
import type { Lang } from '@/modules/core/i18n/translations'
import { translations } from '@/modules/core/i18n/translations'

export interface I18ni18Context {
	lang: Lang
	t: (k: keyof typeof translations.en) => string
	setLang(l: Lang): void
}

export const i18Context = createContext<I18ni18Context>({
	lang: 'en',
	t: (k) => k,
	setLang: () => {},
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLang] = useState<Lang>('en')
	const t = (k: keyof typeof translations.en) => translations[lang][k]
	return (
		<i18Context.Provider value={{ lang, t, setLang }}>
			{children}
		</i18Context.Provider>
	)
}
