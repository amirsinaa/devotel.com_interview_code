import { useTheme } from '@/modules/ui/hooks/use-theme'
import styles from './dark-mode-toggle.module.css'

export default function DarkModeToggle() {
	const { dark, toggle } = useTheme()
	return (
		<button className={styles.toggle} onClick={toggle}>
			{dark ? '🌙' : '☀️'}
		</button>
	)
}
