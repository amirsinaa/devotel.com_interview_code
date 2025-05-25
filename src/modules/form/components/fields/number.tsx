import type { FieldProps } from '@/modules/form/types/form'
import styles from './field.module.css'

export default function NumberField({
	field,
	value,
	error,
	onChange,
}: FieldProps<number>) {
	return (
		<div className={styles.wrapper}>
			<label>
				{field.label}
				<input
					type='number'
					value={value ?? ''}
					onChange={(e) => onChange(field.id, Number(e.target.value))}
				/>
			</label>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}
