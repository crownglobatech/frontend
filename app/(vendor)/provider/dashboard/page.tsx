import AdChart from '@/app/components/general/AdChart'
import HeaderBanner from '@/app/components/pages/vendor-dashboard/HeadBanner'
import QuickActions from '@/app/components/pages/vendor-dashboard/QuickActions'

export default function VendorDashboard () {
  return (
    <>
      <div className='top-0 sticky w-full'>
        <HeaderBanner />
      </div>
      <div className='flex flex-col gap-2 px-6 py-4'>
        {/* <UnverifiedVendorAlert /> */}
        <div className='flex gap-4 mt-2'>
          <div className='mt-2 w-[60%]'>
            <QuickActions />
          </div>
          {/* notifications */}
          <div className='flex flex-col mt-2 p-4 border border-[var(--foundation-neutral-6)] rounded-md w-[40%] min-h-[50%]'>
            <h2 className='mb-4 font-semibold text-[16px] text-[var(--heading-color)]'>
              Recent Activities
            </h2>
            <div className='flex flex-1 justify-center items-center'>
              <p className='text-[12px] text-[var(--foundation-neutral-8)] text-center'>
                No recent activity yet. Your updates will appear here once you
                start posting ads.
              </p>
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          {/* ad chart */}
          <div className='mt-4 w-[60%]'>
            <AdChart />
          </div>
          {/* ratings */}
          <div className='flex flex-col mt-2 p-4 border border-[var(--foundation-neutral-6)] rounded-md w-[40%] min-h-[50%]'>
            <h2 className='mb-4 font-semibold text-[16px] text-[var(--heading-color)]'>
              Ratings & Feedbacks
            </h2>
            <div className='flex flex-1 justify-center items-center'>
              <p className='text-[12px] text-[var(--foundation-neutral-8)] text-center'>
                You’ll start receiving feedback as customers engage with your
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
