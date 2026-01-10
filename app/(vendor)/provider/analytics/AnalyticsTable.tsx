import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AnalyticsPerformance } from '@/lib/types'

interface AnalyticsTableProps {
  performanceData: { [key: string]: AnalyticsPerformance } | undefined
}

export default function AnalyticsTable({
  performanceData
}: AnalyticsTableProps) {
  const performance: AnalyticsPerformance[] = !performanceData
    ? []
    : Array.isArray(performanceData)
      ? performanceData
      : Object.values(performanceData);

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

      <Table className='max-h-20 overflow-y-scroll scrollbar-hide'>
        <TableHeader>
          <TableRow className='bg-[var(--foundation-neutral-4)] z-[-999]'>
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
          {performance.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={14}
                className='py-6 text-[var(--foundation-neutral-8)] text-center'
              >
                No performance data available yet
              </TableCell>
            </TableRow>
          ) : (
            performance.map((data: AnalyticsPerformance, index: number) => (
              <TableRow key={index} className='border-none'>
                <TableCell className='text-[var(--heading-color)]'>{data.title}</TableCell>
                <TableCell className='text-[var(--heading-color)]'>{data.searches}</TableCell>
                <TableCell className='text-[var(--heading-color)]'>{data.clicks}</TableCell>
                <TableCell className='text-[var(--heading-color)]'>{data.views}</TableCell>
                <TableCell className='text-[var(--heading-color)]'>{data.inquiries}</TableCell>
                <TableCell>
                  <span
                    className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${data.status === 'paused'
                      ? 'bg-[#FFF4D3] text-[var(--brand-accent-color)]'
                      : data.status === 'Approved'
                        ? 'bg-[#C8FFD5] text-[var(--success-color)]'
                        : 'bg-[var(--text-body)] text-white'
                      }`}
                  >
                    {data.status === 'Approved' ? 'Active' : data.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
