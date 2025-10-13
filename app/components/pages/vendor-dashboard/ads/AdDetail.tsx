import HouseDetail from './AdHouseDetail'
import AdPerformaceSummary from './AdPerformance'
import EditContactInfo from './EditAdContactInfo'

export default function AdDetails () {
  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
        <HouseDetail />
      </div>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
        <EditContactInfo />
      </div>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
       <AdPerformaceSummary />
      </div>
    </div>
  )
}
