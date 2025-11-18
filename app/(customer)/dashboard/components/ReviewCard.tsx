import Rating from '@/app/components/general/Rating'

export default function ReviewCard () {
  return (
    <div className='flex flex-col gap-2 bg-white shadow-lg px-4 py-2 rounded-md w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='text-[12px] text-[var(--text-body)]'>John Adebayo</h2>
          <span className='text-[10px] text-[var(--foundation-neutral-8)]'>2 days ago</span>
        </div>
        <Rating rate={5} />
      </div>
      <p className='text-[10px] text-black'>
        Peter&apos;s team really did a great job. The process was smooth and strictly
        professional
      </p>
    </div>
  )
}
