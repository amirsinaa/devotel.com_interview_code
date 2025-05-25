export type CellValue = string | number | boolean | null

export interface Submission {
	id: string
	[key: string]: CellValue
}
