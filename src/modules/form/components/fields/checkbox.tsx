import type { FieldProps } from '@/modules/form/types/form'
import styles from './field.module.css'

export default function CheckboxField({
	field,
	value,
	onChange,
}: FieldProps<boolean>) {
	return (
		<label className={styles.checkbox}>
			<input
				type='checkbox'
				checked={!!value}
				onChange={(e) => onChange(field.id, e.target.checked)}
			/>
			{field.label}
		</label>
	)
}
