import HeaderBanner from '@/app/components/pages/vendor-dashboard/HeadBanner'
import PerformanceMetric from '@/app/components/pages/vendor-dashboard/PerformaceMetricView'
import QuickActions from '@/app/components/pages/vendor-dashboard/QuickActions'
import UnverifiedVendorAlert from '@/app/components/pages/vendor-dashboard/UnverifiedVendorAlert'

export default function VendorDashboard () {
  return (
    <>
      <div className='top-0 sticky w-full'>
        <HeaderBanner />
      </div>
      <div className='px-6 py-4'>
        <UnverifiedVendorAlert />
        <div className='mt-2'>
          <h2 className='font-semibold text-[18px] text-black'>
            Quick Actions
          </h2>
          <div className='mt-2'>
            <QuickActions />
          </div>
          <div className='mt-4'>
            <PerformanceMetric />
          </div>
        </div>
      </div>
    </>
  )
}
