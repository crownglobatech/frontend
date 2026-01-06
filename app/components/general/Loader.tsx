import LoadingSpinner from './LoadingSpinner';

export default function Loader() {
  return (
    <div className='flex justify-center items-center h-[400px]'>
      <LoadingSpinner size="lg" variant="primary" />
    </div>
  )
}
