import type { FormSchema } from '@/modules/form/types/form'
import { api } from '@/modules/core/api/client'
import type { Submission } from '@/modules/core/api/submission'

export const fetchForms = () => api.get<FormSchema[]>('/api/insurance/forms')
export const submitForm = (data: unknown) =>
	api.post<{ id: string }, unknown>('/api/insurance/forms/submit', data)
export const fetchSubmissions = () =>
	api.get<{ columns: string[]; data: Submission[] }>(
		'/api/insurance/forms/submissions',
	)
