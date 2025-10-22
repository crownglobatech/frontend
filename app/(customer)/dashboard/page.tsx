import AdDisplay from './components/AdDisplay'
import CustomerHeader from './components/CustomerHeader'
import HomeFilter from './components/HomeFilter'

interface CustomerDashboardProps {}
export default function CustomerDashboard () {
  return (
    <div>
      {/* customer header */}
      <div className='top-0 z-[1000] sticky w-full'>
        <CustomerHeader />
      </div>
      {/* filter section */}
      <div className='px-6'>
        <HomeFilter />
      </div>
      {/* display all available ads */}
      <div className='mt-4 px-6'>
        <AdDisplay />
      </div>
    </div>
  )
}
