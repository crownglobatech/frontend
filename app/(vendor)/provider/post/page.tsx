import NewAdContent from '@/app/components/pages/vendor-dashboard/ads/NewAdContent'
import NotificationDropdown from '@/app/components/pages/vendor-dashboard/NotificationDropdown'
import ProfileDropDown from '@/app/components/pages/vendor-dashboard/ProfileDropDown'
import Header from '@/app/components/pages/vendor-dashboard/Header'

export default function PostNewAd() {
  return (
    <div>
      <Header
        pageTitle="Post New Ad"
        actions={
          <>
            <div className='shadow-sm rounded-full'>
              <ProfileDropDown />
            </div>
            <div className='shadow-sm rounded-full'>
              <NotificationDropdown />
            </div>
          </>
        }
      />

      {/* content */}
      <div className='flex flex-col gap-4 px-4 md:px-16 py-8'>
        <div>
          <NewAdContent />
        </div>
      </div>
    </div>
  )
}
