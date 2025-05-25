import { Link } from 'react-router-dom'
import { useT } from '@/modules/core/i18n/hooks/use-translate'

export default function Home() {
	const t = useT()

	const cards = [
		{
			slug: 'health',
			title: t('health_insurance'),
		},
		{
			slug: 'home',
			title: t('home_insurance'),
		},
		{
			slug: 'car',
			title: t('car_insurance'),
		},
	]

	return (
		<div className='container flex-center'>
			<h1>{t('appName')}</h1>
			<p>{t('home_page_help')}</p>

			<div className='flex'>
				{cards.map((c) => (
					<article key={c.slug} className='card'>
						<h3>{c.title}</h3>
						<Link to={`/apply/${c.slug}`} className='btn'>
							{t('apply_now')} →
						</Link>
					</article>
				))}

				<article className='card'>
					<h3>{t('view_applications')}</h3>

					<Link to='/submissions' className='btn'>
						{t('view')} →
					</Link>
				</article>
			</div>
		</div>
	)
}
