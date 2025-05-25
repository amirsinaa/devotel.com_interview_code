import { useState } from 'react'
import type { JSX } from 'react'
import type { Field, FieldProps } from '@/modules/form/types/form'
import type { GroupField as GroupFieldType } from '@/modules/form/types/form'
import styles from './field.module.css'

interface Props extends FieldProps<never> {
	field: GroupFieldType
	renderChild: (f: Field) => JSX.Element | null
}

export default function GroupField({ field, renderChild }: Props) {
	const [order, setOrder] = useState(() => field.fields.map((f) => f.id))

	const onDragStart = (id: string) => (e: React.DragEvent) =>
		e.dataTransfer.setData('text/plain', id)

	const onDrop = (targetId: string) => (e: React.DragEvent) => {
		const sourceId = e.dataTransfer.getData('text/plain')
		if (!sourceId || sourceId === targetId) return

		setOrder((prev) => {
			const next = prev.filter((i) => i !== sourceId)
			const idx = next.indexOf(targetId)
			next.splice(idx === -1 ? next.length : idx, 0, sourceId)
			return next
		})
	}

	return (
		<fieldset className={styles.group}>
			<legend>{field.label}</legend>

			{order.map((id) => {
				const child = field.fields.find((f) => f.id === id)!
				if (!child) return null
				return (
					<div
						key={id}
						draggable
						onDragStart={onDragStart(id)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={onDrop(id)}
						className={styles.draggable}>
						{renderChild(child)}
					</div>
				)
			})}
		</fieldset>
	)
}
