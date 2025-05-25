/// <reference types="@testing-library/jest-dom" />

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DynamicForm from '@/modules/form/components/forms/dynamic-form'

const schema = {
	formId: 'unit',
	title: 'Unit Test',
	fields: [{ id: 'name', label: 'Name', type: 'text', required: true }],
}

vi.stubGlobal('fetch', () =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ id: '1' }),
	}),
)

describe('DynamicForm', () => {
	it('shows required error', async () => {
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		render(<DynamicForm schema={schema as any} />)
		fireEvent.click(screen.getByText('Submit'))
		expect(await screen.findByText('required')).toBeInTheDocument()
	})
})
