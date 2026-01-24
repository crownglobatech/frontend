import NewAdContent from '@/app/components/pages/vendor-dashboard/ads/NewAdContent'
import NotificationDropdown from '@/app/components/pages/vendor-dashboard/NotificationDropdown'
import ProfileDropDown from '@/app/components/pages/vendor-dashboard/ProfileDropDown'
import Image from 'next/image'
export default function PostNewAd() {
  return (
    <div>
      <div className='top-0 z-30 sticky bg-white shadow-sm px-6 py-4 w-full'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-[20px] text-[var(--heading-color)]'>
            Post New Ad
          </h2>
          {/* Icons */}
          <div className='flex flex-row-reverse items-center gap-8'>
            <div className='shadow-sm rounded-full'>
              <ProfileDropDown />
            </div>
            <div className='shadow-sm rounded-full'>
              <NotificationDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className='flex flex-col gap-4 px-16 py-8'>
        <div>
          <NewAdContent />
        </div>
      </div>
    </div>
  )
}
