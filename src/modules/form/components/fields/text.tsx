import type { FieldProps } from '@/modules/form/types/form'
import styles from './field.module.css'

export default function TextField({
	field,
	value,
	error,
	onChange,
}: FieldProps<string>) {
	return (
		<div className={styles.wrapper}>
			<label>
				{field.label}
				<input
					type='text'
					value={value ?? ''}
					onChange={(e) => onChange(field.id, e.target.value)}
				/>
			</label>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}
