'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { getAllCategories } from "@/lib/api/admin"
import { logger } from "@/lib/logger"
import { useEffect, useState } from "react"

interface AdDetailFormProps {
  data: {
    title: string
    price: string
    description: string
    category_id: number | null
  }
  onChange: (field: string, value: string) => void
}

// const servicesList = [
//   "House painters",
//   "Electricians",
//   "Carpenters",
//   "Estate legal practitioners",
//   "Surveyors",
//   "Developers",
//   "House agents",
//   "Interior decoration",
//   "Gardeners",
//   "Plumbers",
//   "Van rentals",
//   "Event source",
//   "Others",
// ];

export default function AdDetailForm({ data, onChange }: AdDetailFormProps) {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
      logger.log(data)
    }
    fetchCategories()
  }, [])
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
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='category'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Category
          </label>
          <Select
            value={data.category_id?.toString()}
            onValueChange={(value) => onChange('category_id', value === "placeholder_reset" ? "" : value)}
          >
            <SelectTrigger className="bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]">
              {categories.find((c: any) => c.id.toString() === data.category_id?.toString())?.name || <span className="text-gray-400 font-normal">Select Category</span>}
            </SelectTrigger>
            <SelectContent className="text-[var(--heading-color)]">
              <SelectItem value="placeholder_reset" className="text-gray-400">Select Category</SelectItem>
              {categories?.map((service: any) => (
                <SelectItem key={service.id} value={service.id.toString()} className="bg-white px-4 py-2 w-full text-[12px]">
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      {
        Number(data.category_id) !== 11 && (
          <div className='flex flex-col gap-1'>
            <label
              htmlFor='price'
              className='font-semibold text-[14px] text-[var(--heading-color)]'
            >
              Service Price
            </label>
            <input
              id='price'
              type='number'
              name='price'
              min={0}
              value={data.price}
              onWheel={e => e.currentTarget.blur()}
              onChange={e => onChange('price', e.target.value)}
              placeholder='e.g. 50000000'
              className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm font-semibold text-[12px]'
            />
          </div>
        )
      }
    </div>
  )
}
