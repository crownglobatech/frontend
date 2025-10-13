import Button from '../../general/Button'

export default function UnverifiedVendorAlert () {
  return (
    <div className='flex justify-between items-center px-6 py-4 rounded-md bg-[var(--accent-color)]'>
      <div className='flex flex-col gap-2'>
        <h2 className='font-semibold text-[16px] capitalize'>
          Complete your verification
        </h2>
        <p className='max-w-[80%] text-[14px] text-[var(--foundation-neutral-8)]'>
          To ensure the trust and security of our platform, Please complete your
          KYC/KYB verification. This will allow you to access all features and
          build credibility with customers.
        </p>
      </div>
      <div>
        <Button
          title='Verify...'
          styles='bg-[var(--primary-color)] text-white cursor-pointer py-2 px-4 rounded-md font-semibold'
        />
      </div>
    </div>
  )
}
