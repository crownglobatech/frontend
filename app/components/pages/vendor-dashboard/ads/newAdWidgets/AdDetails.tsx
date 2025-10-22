'use client'
interface AdDetailFormProps {
  data: {
    title: string
    description: string
  }
  onChange: (field: string, value: string) => void
}

export default function AdDetailForm({ data, onChange }: AdDetailFormProps) {
  return (
    <div className='flex flex-col gap-2 mt-4'>
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
            name="title"
            required
            value={data.title}
            onChange={e => onChange('title', e.target.value)}
            placeholder='Vineyard Estate'
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
          value={data.description}
          name="description"
          required
          onChange={e => onChange('description', e.target.value)}
          placeholder='Describe your ad...'
          className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px] resize-none'
          rows={4}
        />
      </div>
    </div>
  )
}
