'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface FilterOption {
  name: string
  label: string
  options: { value: string; label: string }[]
}

interface HomeFilterProps {
  loading: boolean
  filters: Record<string, string>
  onFilterChange: (filterName: string, value: string) => void
  filterOptions: FilterOption[]
  activeFilterCount: number
  resultCount: number
}

export default function HomeFilter({
  loading,
  filters,
  onFilterChange,
  filterOptions,
  activeFilterCount,
  resultCount
}: HomeFilterProps) {
  const currentCategory = filters.category || 'all'

  return (
    <div className='flex flex-col'>
      {/* Top filter navigation */}
      <div className='flex justify-between py-2 border-gray-300 border-b'>
        <div className='flex items-center gap-6'>
          {[
            { key: 'all', label: 'All Listings' },
            { key: 'buy-homes', label: 'Buy Homes' },
            { key: 'rent-homes', label: 'Rent Homes' },
            { key: 'allied-homes', label: 'Allied Services' }
          ].map(item => (
            <button
              key={item.key}
              className={`text-sm font-medium ${
                currentCategory === item.key
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-6'>
          <span className='flex items-center gap-1.5 hover:opacity-80 font-bold text-gray-800 text-sm cursor-pointer'>
            Filters
            <span className='flex justify-center items-center bg-blue-600 rounded-full w-5 h-5 font-bold text-white text-xs'>
              {activeFilterCount}
            </span>
          </span>
          <span className='hover:opacity-80 font-bold text-gray-800 text-sm cursor-pointer'>
            Sorting
          </span>
        </div>
      </div>

      {/* Filter dropdowns using shadcn Select */}
      <div className='flex flex-wrap gap-4 mt-2'>
        {filterOptions.map(option => (
          <div key={option.name} className='w-[150px]'>
            <Select
              value={
                filters[option.name] &&
                filters[option.name] !== option.label
                  ? filters[option.name]
                  : 'default'
              }
              onValueChange={val =>
                onFilterChange(option.name, val === 'default' ? option.label : val)
              }
            >
              <SelectTrigger className='w-full font-semibold text-[12px] text-gray-800'>
                <SelectValue placeholder={option.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='default'>{option.label}</SelectItem>
                {option.options.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {!loading && (
        <span className='mt-2 text-gray-500 text-sm'>
          {resultCount} results
        </span>
      )}
    </div>
  )
}
