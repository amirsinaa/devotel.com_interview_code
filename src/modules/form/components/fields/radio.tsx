import type { FieldProps } from '@/modules/form/types/form'
import styles from './field.module.css'

export default function RadioField({
	field,
	value,
	error,
	onChange,
}: FieldProps<string>) {
	const opts = field.options as string[]
	return (
		<div className={styles.wrapper}>
			<span>{field.label}</span>
			<div className={styles.radioRow}>
				{opts.map((opt) => (
					<label key={opt} className={styles.radioOpt}>
						<input
							type='radio'
							name={field.id}
							value={opt}
							checked={value === opt}
							onChange={() => onChange(field.id, opt)}
						/>
						{opt}
					</label>
				))}
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}
