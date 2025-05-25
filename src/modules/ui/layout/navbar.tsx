import { Link } from 'react-router-dom'
import { useState } from 'react'
import DarkModeToggle from '@/modules/ui/dark-mode-toggle'
import { useLang } from '@/modules/core/i18n/hooks/use-translate'
import styles from './navbar.module.css'

export default function Navbar() {
	const { lang, setLang, t } = useLang()
	const [open, setOpen] = useState(false)
	return (
		<header className={styles.navbar}>
			<div className={styles.brand}>
				<Link to='/'>{t('appName')}</Link>
			</div>
			<button
				className={styles.burger}
				onClick={() => setOpen((o) => !o)}
				aria-label='menu'>
				<div
					style={{ transform: open ? 'rotate(45deg) translateY(6px)' : '' }}
				/>
				<div style={{ opacity: open ? 0 : 1 }} />
				<div
					style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : '' }}
				/>
			</button>

			<nav className={styles.links}>
				<Link to='/apply/health'>{t('health')}</Link>
				<Link to='/apply/car'>{t('car')}</Link>
				<Link to='/apply/home'>{t('home')}</Link>
				<Link to='/submissions'>{t('view_applications')}</Link>
			</nav>

			<div className={styles.actions}>
				<DarkModeToggle />
				<select
					value={lang}
					onChange={(e) => setLang(e.target.value as 'en' | 'fa')}
					className={styles.langSelect}>
					<option value='en'>EN</option>
					<option value='fa'>FA</option>
				</select>
			</div>
			{open && (
				<nav className={styles.dropdown} onClick={() => setOpen(false)}>
					<Link to='/apply/health'>{t('health')}</Link>
					<Link to='/apply/car'>{t('car')}</Link>
					<Link to='/apply/home'>{t('home')}</Link>
					<Link to='/submissions'>{t('view_applications')}</Link>
				</nav>
			)}
		</header>
	)
}
