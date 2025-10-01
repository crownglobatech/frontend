import Link from 'next/link'
export default function ResetPassword () {
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <div>
        <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
          Setup a new password?
        </h2>
        <p className='text-[14px] text-[var(--foundation-neutral)] text-center'>
          Create a strong password you’ll remember. For your security, don’t
          reuse old passwords.
        </p>
      </div>

     <div className='flex flex-col gap-4 mt-6 w-full'>
        <div className='flex flex-col w-full'>
        <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
          New Password <span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          placeholder='************'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
        />
      </div>
      <div className='flex flex-col w-full'>
        <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
         Confirm Password <span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          placeholder='************'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
        />
      </div>
     </div>

      <div className='mt-2'>
        <Link
          href='/auth/forgot-password/success'
          className='bg-[var(--primary-color)] px-4 py-2 rounded-md font-semibold text-[13px] text-white'
        >
          Reset Password
        </Link>
      </div>
    </div>
  )
}
