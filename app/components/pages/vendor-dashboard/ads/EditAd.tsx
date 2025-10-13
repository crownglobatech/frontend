'use client'
import ImageUpload from './HandleImageUpload'

export default function EditAd () {
  const handleImages = (files: File[]) => {
    console.log('Selected images:', files)
    // you can send files to your API or Firebase here
  }

  return (
    <div>
      <h2 className='font-semibold text-[14px] text-[var(--heading-color)]'>
        Edit Ad Details
      </h2>
      {/* edit form fileds */}
      <form className='flex flex-col gap-2 mt-4'>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Ad Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='Vineyard Estate'
            className='px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='description'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            cols={5}
            rows={3}
            placeholder='Nestled in a serene and well 
developed neighborhood, Vineyard 
Estate offers the perfect blend of 
comfort, elegance, and modern living.'
            className='px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px] break-words'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Pricing <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='50,000,000'
            className='px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Bed Room <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='4'
            className='px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Bath Room <span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            placeholder='4'
            className='px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='category'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Category <span className='text-red-500'>*</span>
          </label>
          <select
            name='category'
            id='category'
            className='p-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full text-[12px] text-[var(--heading-color)] capitalize'
          >
            <option value='Real Estate/Property'>Real Estate/Property</option>
            <option value='category 2'>category 2</option>
            <option value='category 3'>category 3</option>
            <option value='category 4'>category 4</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Listing <span className='text-red-500'>*</span>
          </label>
          <select
            name='listing'
            id='listing'
            className='p-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full text-[12px] text-[var(--heading-color)] capitalize'
          >
            <option value='Real Estate/Property'>Rent</option>
            <option value='listing 2'>listing 2</option>
            <option value='listing 3'>listing 3</option>
            <option value='listing 4'>listing 4</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='images'
            className='font-semibold text-[13px] text-[var(--heading-color)]'
          >
            Images <span className='text-red-500'>*</span>
          </label>
          <ImageUpload onChange={handleImages} />
        </div>

        <div className='flex flex-col gap-2'>
          <button className='bg-[var(--primary-color)] px-4 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer'>
            Save Changes
          </button>
          <button className='bg-transparent px-4 py-2 border border-[var(--brand-accent-color)] rounded-sm font-semibold text-[14px] text-[var(--brand-accent-color)] cursor-pointer'>
            Pause Ad
          </button>
        </div>
      </form>
    </div>
  )
}
