import Link from 'next/link'
export default function ForgotPassword () {
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <div>
        <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
          Forgot Your Password?
        </h2>
        <p className='text-[13px] text-[var(--foundation-neutral)] text-center'>
          Don’t worry. Enter your registered email, and we’ll send you a
          one-time code (OTP) to reset your password securely.
        </p>
      </div>

      <div className='flex flex-col w-full'>
        <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
          Email Address <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          placeholder='example@gmail.com'
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
        />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <Link
          href='/auth/forgot-password/verify-email'
          className='bg-[var(--primary-color)] px-4 py-2 rounded-md font-semibold text-[13px] text-white'
        >
          Reset Password
        </Link>
        <Link
          href='/auth/login'
          className='bg-transparent font-semibold text-[13px] text-[var(--primary-color)]'
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
