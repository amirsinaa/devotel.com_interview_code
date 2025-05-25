import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { I18nProvider } from '@/modules/core/i18n/context/i18n.context'
import { ThemeProvider } from '@/modules/ui/context/theme.context'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<I18nProvider>
				<RouterProvider router={router} />
			</I18nProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
