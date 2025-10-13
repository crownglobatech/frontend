import AdPerformanceTable from './AdPerformanceTable'

export default function PerformanceMetric () {
  return (
    <div className='bg-white px-6 py-4 border border-[var(--foundation-neutral-7)] rounded-xl'>
      <h2 className='mb-4 font-semibold text-[18px] text-[var(--heading-color)]'>
        Individual Ad Performance
      </h2>

      <AdPerformanceTable />
    </div>
  )
}
