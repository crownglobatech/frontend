import { Ad } from '@/lib/types'
import HouseDetail from './AdHouseDetail'
import AdPerformaceSummary from './AdPerformance'
import EditContactInfo from './EditAdContactInfo'

interface Props {
  adData: Ad
}
export default function AdDetails ({ adData }: Props) {
  return (
    <div className='flex flex-col gap-8'>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
        <HouseDetail adData={adData} />
      </div>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
        <EditContactInfo adData={adData} />
      </div>
      <div className='bg-[var(--foundation-neutral-3)] p-6 rounded-md'>
        <AdPerformaceSummary adData={adData} />
      </div>
    </div>
  )
}
