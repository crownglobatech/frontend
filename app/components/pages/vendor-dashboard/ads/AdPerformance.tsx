import { Ad } from "@/lib/types"

interface Props{
  adData: Ad
}
export default function AdPerformaceSummary ({adData}:Props) {
  const metric = [
    {
      title: 'Views',
      value: 300
    },
    {
      title: 'Clicks',
      value: 300
    },
    {
      title: 'Search',
      value: 300
    },
    {
      title: 'Inquiries',
      value: 300
    }
  ]
  return (
    <div className="flex flex-col gap-4">
      <h2 className='font-bold text-[16px] text-[var(--heading-color)]'>
        Ad Performance Summary
      </h2>
      <div className="flex flex-wrap justify-between items-center gap-2">
        {metric.map((metric, index) => {
          return (
            <div className='flex flex-col justify-center items-center bg-white shadow-lg px-12 py-4 rounded-sm' key={index}>
              <h2 className="text-[14px] text-black">{metric.title}</h2>
              <h1 className="font-bold text-[16px] text-black">{metric.value}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}
