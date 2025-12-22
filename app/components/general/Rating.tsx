import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

interface Props {
  rate: string | number
}

export default function Rating({ rate }: Props) {
  const numericRate = typeof rate === 'string' ? parseFloat(rate) : rate
  const totalStars = 5

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, i) => (
        i < numericRate ? (
          <FaStar key={i} size={5} color="#DDBF5F" />
        ) : (
          <FaRegStar key={i} size={5} color="gray" />
        )
      ))}
      <h2 className="pl-1 text-[10px]">{numericRate.toFixed(1)}</h2>
    </div>
  )
}
