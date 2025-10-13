export default function AdDetailForm () {
  return (
    <form action='' className='flex flex-col gap-2 mt-4'>
      <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='title'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Ad Title
          </label>
          <input
            type='text'
            placeholder='Vineyard Estate'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='category'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Category
          </label>
          <input
            type='text'
            placeholder='Real Estate/Property'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <label
          htmlFor='description'
          className='font-semibold text-[14px] text-[var(--heading-color)]'
        >
          Description
        </label>
        <textarea
          placeholder='Vineyard Estate'
          name='desc'
          id='desc'
          cols={2}
          rows={4}
          className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px] appearance-none resize-none'
        ></textarea>
      </div>
    </form>
  )
}
