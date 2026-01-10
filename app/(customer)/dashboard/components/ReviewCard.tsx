import Rating from '@/app/components/general/Rating'

interface ReviewCardProps {
  review: {
    customer_name: string;
    created_at: string;
    feedback: string;
    rating: number;
    booking: any
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className='flex flex-col gap-2 bg-white shadow-sm px-4 py-2 rounded-md w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='text-[12px] text-[var(--text-body)]'>{review.customer_name || 'Anonymous'}</h2>
          <span className='text-[10px] text-[var(--foundation-neutral-8)]'>{review.created_at}</span>
        </div>
        <Rating rate={review.rating} />
      </div>
      <p className='text-[10px] text-black'>
        {review.feedback || 'No feedback provided by the customer.'}
      </p>
    </div>
  )
}
