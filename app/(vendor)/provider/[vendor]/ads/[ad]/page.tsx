import AdDetails from '@/app/components/pages/vendor-dashboard/ads/AdDetail'
import EditAd from '@/app/components/pages/vendor-dashboard/ads/EditAd'
import HeaderBanner from '@/app/components/pages/vendor-dashboard/ads/HeaderBanner'

interface Props {
  params: {
    adId: string
  }
}

export default function ManageAd ({ params }: Props) {
  const adId = params
  //  get the ad that corresponds to the passed prop value
  return (
    <>
      {/* display the view of the ad */}
      <div className='top-0 z-[1000] sticky w-full'>
        <HeaderBanner />
      </div>
      <div className='p-6'>
        {/* top header */}
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-semibold text-[12px] text-[var(--foundation-neutral-6)]'>
              My Ad /{' '}
              <span className='text-black'>Manage Ad: Vineyard Estate</span>
            </h2>
          </div>
          <div>
            <button className='bg-transparent px-4 py-2 border border-[var(--danger-color)] rounded-md font-semibold text-[12px] text-[var(--danger-color)] cursor-pointer'>
              Delete Ad
            </button>
          </div>
        </div>
        {/* Ad Details */}
        <div className='flex items-start gap-8 mt-2 w-full'>
          <div className='w-[70%]'>
            <AdDetails />
          </div>
          <div className='bg-transparent px-2 py-4 border border-[var(--foundation-neutral-6)] rounded-sm w-[30%]'>
            <EditAd />
          </div>
        </div>
      </div>
    </>
  )
}
