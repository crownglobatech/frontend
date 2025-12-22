import Rating from '@/app/components/general/Rating'

interface ReviewCardProps {
  review: {
    reviewer_name: string;
    created_at: string;
    feedback: string;
    rating: number;
    booking: any
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const reviewerName = review.booking.customer?.first_name + ' ' + review.booking.customer?.last_name || 'Anonymous';
  return (
    <div className='flex flex-col gap-2 bg-white shadow-lg px-4 py-2 rounded-md w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='text-[12px] text-[var(--text-body)]'>{reviewerName}</h2>
          <span className='text-[10px] text-[var(--foundation-neutral-8)]'>{new Date(review.created_at).toLocaleDateString()}</span>
        </div>
        <Rating rate={review.rating} />
      </div>
      <p className='text-[10px] text-black'>
        {review.feedback || 'No feedback provided by the customer.'}
        professional
      </p>
    </div>
  )
}
