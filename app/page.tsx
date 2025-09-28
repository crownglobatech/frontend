import Button from './components/general/Button'
import Header from './components/general/Header'

export default function LandingPage () {
  return (
    <main>
      {/* hero */}
      <section className="relative flex flex-col bg-[url('/herobg.png')] bg-cover bg-no-repeat bg-top w-full h-[90vh]">
        {/* overlay bg */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] w-full h-full' />
        <div className='z-10 relative flex justify-center px-4 pt-8 w-full'>
          <div className='flex justify-between items-center w-full max-w-[80%]'>
            <Header />
          </div>
        </div>

        {/* hero content */}
        <div className='z-10 relative flex flex-col justify-center items-center px-8 md:px-20 h-full'>
          <div className='z-10 relative flex flex-col justify-center items-center mx-auto max-w-[60%] text-center'>
            <h1 className='font-bold text-[45px] text-white leading-tight'>
              Find Your Perfect{' '}
              <span className='text-[var(--secondary-color)]'>Property</span>{' '}
              And Trusted Service
            </h1>
            <h3 className='mt-4 font-normal text-white text-lg'>
              Search properties, connect with verified agents, and access
              reliable real estate services all in one platform.
            </h3>
          </div>

          {/* Optional CTA buttons */}
          <div className='flex justify-center items-center gap-4 mt-4'>
            <Button
              styles='text-white font-semibold border-none rounded-md text-[14px] px-4 py-2 bg-[var(--primary-color)]'
              title='View Property'
            />
            <Button
              styles='text-white font-semibold border-white border rounded-md text-[14px] px-4 py-2 bg-transparent'
              title='Contact Now'
            />
          </div>
        </div>
      </section>
    </main>
  )
}
