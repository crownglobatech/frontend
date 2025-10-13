import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function AdPerformanceTable () {
  return (
    <Table className='min-h-[200px]'>
      <TableHeader>
        <TableRow className='bg-[var(--foundation-neutral-4)]'>
          <TableHead className='w-[40%] font-semibold text-[var(--heading-color)]'>
            Ad Title
          </TableHead>
          <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
            Search
          </TableHead>
          <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
            Views
          </TableHead>
          <TableHead className='w-[20%] font-semibold text-[var(--heading-color)] text-right'>
            Status
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className='py-6 text-[var(--foundation-neutral-8)] text-center'>
            No performance data available yet
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
