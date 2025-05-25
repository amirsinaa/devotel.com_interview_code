import { useEffect, useMemo, useState } from 'react'
import styles from './application-table.module.css'
import { fetchSubmissions } from '@/modules/core/api/insurance'
import ColumnSelector from './column-selector'
import type { Submission, CellValue } from '@/modules/core/api/submission'
import { useT } from '@/modules/core/i18n/hooks/use-translate'

export default function ApplicationTable() {
	const [rows, setRows] = useState<Submission[]>([])
	const [columns, setColumns] = useState<string[]>([])
	const [visibleCols, setVisibleCols] = useState<string[]>([])
	const [sort, setSort] = useState<{ col: string; dir: 'asc' | 'desc' } | null>(
		null,
	)
	const [q, setQ] = useState('')
	const pageSize = 5
	const [page, setPage] = useState(0)

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		fetchSubmissions().then((d: any) => {
			setRows(d.data)
			setColumns(d.columns)
			setVisibleCols(d.columns)
		})
	}, [])

	const filtered = useMemo<Submission[]>(() => {
		let r = rows

		if (q) {
			const needle = q.toLowerCase()
			r = r.filter((row) =>
				Object.values(row).some((v) =>
					String(v).toLowerCase().includes(needle),
				),
			)
		}

		if (sort) {
			r = [...r].sort((a, b) => {
				const va: CellValue = a[sort.col]
				const vb: CellValue = b[sort.col]

				if (va == null) return 1
				if (vb == null) return -1

				const asc = String(va).localeCompare(String(vb), undefined, {
					numeric: true,
					sensitivity: 'base',
				})
				return sort.dir === 'asc' ? asc : -asc
			})
		}

		return r
	}, [rows, q, sort])
	const paged = filtered.slice(page * pageSize, page * pageSize + pageSize)
	const t = useT()
	return (
		<div className='flex-center card'>
			<div className={styles.toolbar}>
				<input
					placeholder={t('search')}
					value={q}
					onChange={(e) => {
						setQ(e.target.value)
						setPage(0)
					}}
				/>
				<ColumnSelector
					all={columns}
					selected={visibleCols}
					onChange={setVisibleCols}
				/>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						{visibleCols.map((c) => (
							<th
								key={c}
								onClick={() =>
									setSort((s) =>
										s?.col === c
											? { col: c, dir: s.dir === 'asc' ? 'desc' : 'asc' }
											: { col: c, dir: 'asc' },
									)
								}>
								{c}
								{sort?.col === c ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paged.map((row) => (
						<tr key={row.id}>
							{visibleCols.map((c) => (
								<td key={c}>{row[c]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.pagination}>
				<button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
					⟨ Prev
				</button>
				<span>
					Page {page + 1} / {Math.ceil(filtered.length / pageSize)}
				</span>
				<button
					disabled={(page + 1) * pageSize >= filtered.length}
					onClick={() => setPage((p) => p + 1)}>
					Next ⟩
				</button>
			</div>
		</div>
	)
}
