import Image from 'next/image'

export default function QuickActions() {
  const actions = [
    {
      icon: '/addoutline.png',
      title: 'Post New Ad',
      desc: 'Create a new advertisement for your service.',
    },
    {
      icon: '/adicon.png',
      title: 'My Ad',
      desc: 'View and manage your existing advertisements.',
    },
    {
      icon: '/majestic.png',
      title: 'Analytics & Insights',
      desc: 'Analyze the performance of your ads and gain insight.',
    },
  ]

  return (
    <div className='flex flex-wrap gap-6'>
      {actions.map((action, index) => (
        <div
          key={index}
          className='flex flex-col justify-start items-start gap-2 bg-[var(--foundation-primary)] shadow-sm p-5 border-[var(--foundation-color)] border-2 rounded-xl w-[280px] hover:scale-[1.03] transition-all duration-300 cursor-pointer'
        >
          {/* icon */}
          <div className='bg-[var(--foundation-neutral-3)] p-3 rounded-full'>
            <Image
              src={action.icon}
              alt={action.title}
              height={18}
              width={18}
              className='object-contain'
            />
          </div>

          {/* title */}
          <h2 className='font-semibold text-[15px] text-[var(--heading-color)]'>
            {action.title}
          </h2>

          {/* desc */}
          <p className='max-w-[250px] text-[13px] text-[var(--foundation-neutral-8)] leading-snug'>
            {action.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
