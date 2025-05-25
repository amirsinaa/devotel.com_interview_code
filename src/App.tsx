import { Outlet } from 'react-router-dom'
import Navbar from '@/modules/ui/layout/navbar'

export default function App() {
	return (
		<div style={{ padding: '1rem' }}>
			<Navbar />
			<Outlet />
		</div>
	)
}
