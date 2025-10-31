import { RatingsFeedbacks } from '@/lib/types'

interface Props {
  ratings_feedbacks: RatingsFeedbacks | undefined
}
export default function CustomerRatingAndFeedbacks ({
  ratings_feedbacks
}: Props) {
  if (!ratings_feedbacks?.recent_feedbacks || ratings_feedbacks.recent_feedbacks.length === 0) {
    return (
      <p className='text-[12px] text-[var(--foundation-neutral-8)] text-center'>
        You’ll start receiving feedbacks as customers engage with your services.
      </p>
    )
  }
  console.log(ratings_feedbacks?.recent_feedbacks)

  return (
    <div>
      {ratings_feedbacks?.recent_feedbacks?.map((item, index) => {
        return <div key={index}></div>
      })}
    </div>
  )
}
