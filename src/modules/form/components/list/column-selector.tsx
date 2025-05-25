import { useState } from 'react'
import { useT } from '@/modules/core/i18n/hooks/use-translate'
import styles from './column-selector.module.css'

interface Props {
	all: string[]
	selected: string[]
	onChange(cols: string[]): void
}

export default function ColumnSelector({ all, selected, onChange }: Props) {
	const [open, setOpen] = useState(false)
	const t = useT()

	const toggle = (c: string) => {
		onChange(
			selected.includes(c) ? selected.filter((s) => s !== c) : [...selected, c],
		)
	}
	return (
		<div className={styles.menu}>
			<button className={styles.btn} onClick={() => setOpen((o) => !o)}>
				{t('columns')}▾
			</button>
			{open && (
				<ul className={styles.list}>
					{all.map((c) => (
						<li key={c}>
							<label>
								<input
									type='checkbox'
									checked={selected.includes(c)}
									onChange={() => toggle(c)}
								/>
								{c}
							</label>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
