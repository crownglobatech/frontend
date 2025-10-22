export default function Loader () {
  return (
    <div className='flex justify-center items-center space-x-1 h-screen'>
      <span className='bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot [animation-delay:-0.32s]'></span>
      <span className='bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot [animation-delay:-0.16s]'></span>
      <span className='bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot'></span>
    </div>
  )
}
