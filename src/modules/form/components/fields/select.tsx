import { useEffect, useState } from 'react'
import styles from './field.module.css'
import { api } from '@/modules/core/api/client'
import type { FieldProps } from '@/modules/form/types/form'
import type { SelectField as SelectType } from '@/modules/form/types/form'

export default function SelectField({
	field,
	value,
	error,
	onChange,
	parentValues,
}: FieldProps<string>) {
	const f = field as SelectType
	const [options, setOptions] = useState<string[]>(f.options ?? [])

	useEffect(() => {
		if (!f.dynamicOptions) return
		const depVal = parentValues?.[f.dynamicOptions.dependsOn]
		if (!depVal) return
		const url = `${f.dynamicOptions.endpoint}?${f.dynamicOptions.dependsOn}=${depVal}`
		api
			.get<string[]>(url)
			.then(setOptions)
			.catch(() => setOptions([]))
	}, [f, parentValues])

	return (
		<div className={styles.wrapper}>
			<label>
				{field.label}
				<select
					value={value ?? ''}
					onChange={(e) => onChange(field.id, e.target.value)}>
					<option value='' disabled>
						Choose…
					</option>
					{options.map((o) => (
						<option key={o} value={o}>
							{o}
						</option>
					))}
				</select>
			</label>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}
