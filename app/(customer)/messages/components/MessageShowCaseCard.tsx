import Image from 'next/image'
export default function MessageShowcaseCard () {
  return (
    <div className='flex justify-between hover:bg-[var(--foundation-neutral-4)] hover:px-2 hover:py-2 w-full transition-all duration-300 cursor-pointer'>
      <div className='flex items-center gap-4'>
        <div>
          <Image
            alt='user'
            src='/user.png'
            width={40}
            height={40}
            className='object-contain'
          />
        </div>
        <div>
          <h2 className='font-semibold text-[16px] text-black'>Jane Cooper</h2>
          <p className='text-[14px] text-[var(--text-body)]'>Hey! I&apos;m interested in your...</p>
        </div>
      </div>
      <div>
      <span className='text-[14px] text-[var(--muted-text)]'>
        3:40PM
      </span>
      </div>
    </div>
  )
}
