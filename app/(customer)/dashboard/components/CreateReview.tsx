'use client'
import { StarIcon } from 'lucide-react'

export default function CreateReview () {
  return (
    <div className='flex flex-col gap-2 bg-[var(--foundation-neutral-3)] shadow-lg mt-2 px-4 py-6 rounded-md'>
      <h2 className='font-semibold text-[12px] text-[var(--text-body)]'>
        Leave a Review
      </h2>
      <div className='flex flex-col gap-1'>
        <h2 className='text--[var(--foundation-neutral-8)] text-[10px]'>
          Your Rating
        </h2>
        <div className='flex items-center gap-1'>
          <StarIcon size={12} className='bg-transparent cursor-pointer' />
          <StarIcon size={12} className='bg-transparent cursor-pointer' />
          <StarIcon size={12} className='bg-transparent cursor-pointer' />
          <StarIcon size={12} className='bg-transparent cursor-pointer' />
          <StarIcon size={12} className='bg-transparent cursor-pointer' />
        </div>
      </div>
      <form className='flex flex-col gap-1'>
        <label
          htmlFor='comment'
          className='font-semibold text-[10px] text-black'
        >
          Your Comment
        </label>
        <textarea
          name='review'
          id='review'
          rows={5}
          cols={30}
          className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full text-[12px] text-[var(--text-body)] resize-none'
          draggable={false}
          placeholder='Share your experience'
          onDragStart={e => e.preventDefault()}
        ></textarea>

        <div>
          <button className='bg-[var(--primary-color)] mt-1 px-6 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer'>
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}
