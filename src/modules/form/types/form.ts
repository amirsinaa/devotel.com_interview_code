import type { JSX } from 'react'

export interface FormSchema {
	formId: string
	title: string
	fields: Field[]
}

export type Field =
	| TextField
	| NumberField
	| DateField
	| RadioField
	| SelectField
	| CheckboxField
	| GroupField

export interface FieldProps<T = unknown> {
	field: Field
	value: T
	error?: string
	onChange: (name: string, value: T) => void
	parentValues?: Record<string, unknown>
	renderChild?: (f: Field) => JSX.Element | null
}

export interface VisibilityRule {
	dependsOn: string
	condition: 'equals' | 'notEquals' | 'gt' | 'lt'
	value: string | number | boolean
}

export interface NumberValidation {
	min: number
	max: number
}
export interface StringValidation {
	pattern: string
}

export interface BaseField {
	id: string
	label: string
	required?: boolean
	visibility?: VisibilityRule
	options: string[]
}

export interface TextField extends BaseField {
	type: 'text'
	validation: StringValidation
}
export interface NumberField extends BaseField {
	type: 'number'
	validation: NumberValidation
}
export interface DateField extends BaseField {
	type: 'date'
}
export interface RadioField extends BaseField {
	type: 'radio'
}
export interface SelectField extends BaseField {
	type: 'select'
	dynamicOptions?: {
		dependsOn: string
		endpoint: string
		method: 'GET' | 'POST'
	}
}
export interface CheckboxField extends BaseField {
	type: 'checkbox'
}
export interface GroupField extends BaseField {
	type: 'group'
	fields: Field[]
}
