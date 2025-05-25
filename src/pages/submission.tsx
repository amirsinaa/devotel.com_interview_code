import ApplicationTable from '@/modules/form/components/list/application-table'
import { useT } from '@/modules/core/i18n/hooks/use-translate'

export default function SubmissionsPage() {
	const t = useT()

	return (
		<div>
			<h1 className='flex-center'>{t('submitted_applications')}</h1>
			<ApplicationTable />
		</div>
	)
}
