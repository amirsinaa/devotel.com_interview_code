import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchForms } from '@/modules/core/api/insurance'
import DynamicForm from '@/modules/form/components/forms/dynamic-form'
import type { FormSchema } from '@/modules/form/types/form'
import { slugToFormId } from '@/utils'
import { useT } from '@/modules/core/i18n/hooks/use-translate'

export default function ApplyPage() {
	const { type } = useParams()
	const [schema, setSchema] = useState<FormSchema | null>(null)
	const [error, setError] = useState(false)
	const t = useT()

	useEffect(() => {
		fetchForms()
			.then((forms) => {
				const wanted = slugToFormId[type ?? ''] ?? type
				const found = forms.find((f) => f.formId === wanted)
				if (!found) setError(true)
				setSchema(found ?? null)
			})
			.catch(() => setError(true))
	}, [type])

	if (error) return <p>{t('form_not_found')}</p>
	if (!schema) return <p>{t('loading')}</p>
	return <DynamicForm schema={schema} />
}
