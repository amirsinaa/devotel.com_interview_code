import { useState, type ComponentType } from 'react'
import styles from './dynamic-form.module.css'
import { submitForm } from '@/modules/core/api/insurance'
import type {
	FormSchema,
	Field,
	VisibilityRule,
} from '@/modules/form/types/form'
import CheckboxField from '@/modules/form/components/fields/checkbox'
import NumberField from '@/modules/form/components/fields/number'
import TextField from '@/modules/form/components/fields/text'
import DateField from '@/modules/form/components/fields/date'
import GroupField from '@/modules/form/components/fields/group'
import RadioField from '@/modules/form/components/fields/radio'
import SelectField from '@/modules/form/components/fields/select'
import { useAutosave } from '@/modules/form/hooks/use-autosave'
import { useT } from '@/modules/core/i18n/hooks/use-translate'

interface Props {
	schema: FormSchema
}
export const componentMap = {
	text: TextField,
	number: NumberField,
	date: DateField,
	select: SelectField,
	radio: RadioField,
	checkbox: CheckboxField,
	group: GroupField,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as Record<Field['type'], ComponentType<any>>

const isVisible = (
	rule: VisibilityRule | undefined,
	values: Record<string, unknown>,
): boolean => {
	if (!rule) return true
	const actual = values[rule.dependsOn]
	switch (rule.condition) {
		case 'equals':
			return actual === rule.value
		case 'notEquals':
			return actual !== rule.value
		case 'gt':
			return Number(actual) > Number(rule.value)
		case 'lt':
			return Number(actual) < Number(rule.value)
		default:
			return true
	}
}

export default function DynamicForm({ schema }: Props) {
	const [values, setValues] = useState<Record<string, unknown>>({})
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const t = useT()

	const clearDraft = useAutosave(schema.formId, values, setValues)

	const handleChange = (name: string, value: unknown) =>
		setValues((v) => ({ ...v, [name]: value }))

	const validateField = (field: Field, err: Record<string, string>): void => {
		if (!isVisible(field.visibility, values)) return

		const val = values[field.id]

		if (field.required && (val === undefined || val === '')) {
			err[field.id] = t('required')
		}

		if (field.type === 'number' && val !== undefined && val !== '') {
			const cfg = (
				field as typeof field & { validation?: { min?: number; max?: number } }
			).validation
			if (cfg) {
				const num = Number(val)
				if (cfg.min !== undefined && num < cfg.min)
					err[field.id] = `≥ ${cfg.min}`
				if (cfg.max !== undefined && num > cfg.max)
					err[field.id] = `≤ ${cfg.max}`
			}
		}

		if (field.type === 'text' && val) {
			const pattern = (
				field as typeof field & { validation?: { pattern?: string } }
			).validation?.pattern
			if (pattern) {
				const re = new RegExp(pattern)
				if (!re.test(String(val))) err[field.id] = 'Invalid'
			}
		}

		if (field.type === 'group') {
			field.fields.forEach((child) => validateField(child, err))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const err: Record<string, string> = {}

		schema.fields.forEach((f) => validateField(f, err))
		setErrors(err)

		if (Object.keys(err).length) {
			setStatus('idle')
			return
		}

		try {
			await submitForm({ formId: schema.formId, ...values })
			setStatus('success')
			clearDraft()
			setValues({})
		} catch {
			setStatus('error')
		}
	}

	const renderField = (field: Field) => {
		if (!isVisible(field.visibility, values)) return null
		const Cmp = componentMap[field.type]
		return (
			<Cmp
				key={field.id}
				field={field}
				value={values[field.id]}
				error={errors[field.id]}
				onChange={handleChange}
				renderChild={renderField}
			/>
		)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit} noValidate>
			<h1 className='flex-center'>{schema.title}</h1>
			{schema.fields.map(renderField)}
			<button type='submit'>Submit</button>
			{status === 'success' && (
				<p className={styles.success}>{t('submitted')}</p>
			)}
			{status === 'error' && <p className={styles.error}>{t('failed')}</p>}
		</form>
	)
}
