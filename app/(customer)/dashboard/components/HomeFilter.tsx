import { FaChevronDown } from 'react-icons/fa'

export default function HomeFilter() {
  const filterOptions = [
    { name: 'price', label: 'Price Range' },
    { name: 'location', label: 'Location' },
    { name: 'propertyType', label: 'Property Type' },
    { name: 'serviceType', label: 'Service Type' },
    { name: 'rating', label: 'Rating' },
  ]

  return (
    <div className="flex flex-col">
      {/* Top filter navigation */}
      <div className="flex justify-between py-2 border-[var(--heading-color)] border-b">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-[14px] text-[var(--primary-color)]">
            All Listings
          </span>
          <span className="text-[14px] text-[var(--muted-text)]">Buy Homes</span>
          <span className="text-[14px] text-[var(--muted-text)]">Rent Homes</span>
          <span className="text-[14px] text-[var(--muted-text)]">Allied Services</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:opacity-80 font-bold text-[var(--heading-color)] cursor-pointer">
            Filters
          </span>
          <span className="hover:opacity-80 font-bold text-[var(--heading-color)] cursor-pointer">
            Sorting
          </span>
        </div>
      </div>

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-4 mt-2">
        {filterOptions.map((option) => (
          <div
            key={option.name}
            className="relative flex items-center bg-[var(--foundation-primary)] hover:brightness-95 px-4 py-1.5 rounded-sm transition-all cursor-pointer"
          >
            <select
              name={option.name}
              id={option.name}
              className="bg-transparent pr-6 focus:outline-none w-full font-semibold text-[14px] text-[var(--heading-color)] appearance-none cursor-pointer"
            >
              <option value={option.label}>{option.label}</option>
            </select>
            <FaChevronDown
              size={14}
              className="right-3 absolute text-black pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Result count */}
      <span className="mt-2 text-[14px] text-[var(--muted-text)]">
        99.3k results
      </span>
    </div>
  )
}
