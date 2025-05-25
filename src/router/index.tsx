import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ApplyPage from '../pages/apply'
import Home from '../pages/home'
import SubmissionsPage from '../pages/submission'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'apply/:type', element: <ApplyPage /> },
			{ path: 'submissions', element: <SubmissionsPage /> },
		],
	},
])
