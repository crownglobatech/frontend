interface Props {
  rate: string | number
}
import { StarIcon } from 'lucide-react'
export default function Rating ({ rate }: Props) {
  return (
    <div>
      <div className='flex items-center'>
        <StarIcon size={5} color='brown' />
        <StarIcon size={5} color='brown' />
        <StarIcon size={5} color='brown' />
        <StarIcon size={5} color='brown' />
        <StarIcon size={5} color='brown' />
        <h2 className='pl-1 text-[10px]'>5.0</h2>
      </div>
    </div>
  )
}
