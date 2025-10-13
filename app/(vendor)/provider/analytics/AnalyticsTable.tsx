import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function AnalyticsTable () {
  return (
    <div className='mt-4 px-6 py-4 border border-[var(--foundation-neutral-6)]'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='font-semibold text-[14px] text-black'>
          Individual Performance
        </h2>
        <select
          name='timeRange'
          id='timeRange'
          className='px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm text-[#334155] text-[12px]'
        >
          <option value='this week'>This Week</option>
          <option value='this month'>This Month</option>
        </select>
      </div>

      <Table className='min-h-[200px]'>
        <TableHeader>
          <TableRow className='bg-[var(--foundation-neutral-4)]'>
            <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
              Ad Title
            </TableHead>
            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
              Search
            </TableHead>
            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
              Clicks
            </TableHead>
            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
              Views
            </TableHead>
            <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
              Inquiries
            </TableHead>
            <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell
              colSpan={14}
              className='py-6 text-[var(--foundation-neutral-8)] text-center'
            >
              No performance data available yet
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
