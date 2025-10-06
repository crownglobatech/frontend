export default function LoadingDots () {
  return (
    <div className='flex justify-center items-center space-x-1'>
      <span className='bg-white rounded-full w-2 h-2 animate-bounceDot [animation-delay:-0.32s]'></span>
      <span className='bg-white rounded-full w-2 h-2 animate-bounceDot [animation-delay:-0.16s]'></span>
      <span className='bg-white rounded-full w-2 h-2 animate-bounceDot'></span>
    </div>
  )
}
