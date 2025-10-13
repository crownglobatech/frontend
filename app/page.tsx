'use client'
import ApartmentCard from './components/general/ApartmentCard'
import Button from './components/general/Button'
import Footer from './components/general/Footer'
import Header from './components/general/Header'
import HomeFilter from './components/pages/home/HomeFilter'
import ServiceGallery from './components/pages/home/ServiceGallery'
import Services from './components/pages/home/Services'
import { motion } from 'motion/react'

export default function LandingPage () {
  return (
    <main>
      {/* hero */}
      <section className="relative flex flex-col bg-[url('/herobg.png')] bg-cover bg-no-repeat bg-top w-full h-[100vh]">
        {/* overlay bg */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] w-full h-full' />
        <div className='z-10 relative flex justify-center px-4 pt-8 w-full'>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
            className='flex justify-between items-center w-full max-w-[80%]'
          >
            <Header />
          </motion.div>
        </div>

        {/* hero content */}
        <div className='z-10 relative flex flex-col justify-center items-center px-8 md:px-20 h-full'>
          <div className='z-10 relative flex flex-col justify-center items-center mx-auto max-w-[60%] text-center'>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.5, type: 'tween' }}
              className='font-bold text-[45px] text-white leading-tight'
            >
              Find Your Perfect{' '}
              <span className='text-[var(--secondary-color)]'>Property</span>{' '}
              And Trusted Service
            </motion.h1>
            <motion.h3
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 100 }}
              transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
              className='mt-4 font-normal text-white text-lg'
            >
              Search properties, connect with verified agents, and access
              reliable real estate services all in one platform.
            </motion.h3>
          </div>

          {/* Optional CTA buttons */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className='flex justify-center items-center gap-4 mt-4'
          >
            <Button
              styles='text-white font-semibold border-none rounded-md text-[14px] px-4 py-2 bg-[var(--primary-color)]'
              title='View Property'
            />
            <Button
              styles='text-white font-semibold border-white border rounded-md text-[14px] px-4 py-2 bg-transparent'
              title='Contact Now'
            />
          </motion.div>
        </div>
      </section>

      <section className='relative my-8'>
        {/* categories + filter section */}
        <div className='-top-24 left-1/2 absolute w-full max-w-[900px] -translate-x-1/2'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5, type: 'tween', delay: 0.3 }}
            className='flex flex-col justify-center items-center'
          >
            <HomeFilter />
          </motion.div>
        </div>

        <div className='flex flex-col items-center py-[100px]'>
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 100 }}
            transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
            className='font-bold text-[30px] text-[var(--heading-color)]'
          >
            Quick Categories
          </motion.h2>
          <div className='px-16'>
            <Services />
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center bg-[var(--foundation-primary)] mx-4 my-8 py-8'>
        {/* Featured Properties */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
          className='mb-8 font-bold text-[30px] text-[var(--heading-color)]'
        >
          Featured Properties
        </motion.h2>
        {/* display apartment cards */}
        <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Rent'
          />
          <ApartmentCard
            baths={3}
            beds={4}
            image='/estate.png'
            location='Agodi Awolowo, Ibadan'
            price='50000000'
            rating={5}
            title='Vineyard Estate'
            providerVerified={true}
            status='For Sale'
          />
        </div>

        <Button
          styles='border mt-6 border-[var(--primary-color)] rounded-md text-[12px] capitalize text-[var(--primary-color)] font-semibold p-2 bg-transparent hover:bg-[var(--primary-color)] hover:text-white cursor-pointer transition-all'
          title='view all properties'
        />
      </section>

      <section className='flex flex-col items-center my-8 py-4'>
        {/* reliable service */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
          className='mb-8 font-bold text-[30px] text-[var(--heading-color)]'
        >
          Need a reliable service?
        </motion.h2>

        <div className='bg-transparent px-16 w-full'>
          <ServiceGallery />
        </div>
      </section>

      <section className='flex flex-col justify-center items-center gap-4 bg-[var(--foundation-neutral-4)] mx-20 my-8 py-4 rounded-md'>
        {/* banner */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
          className='font-bold text-[30px] text-[var(--heading-color)]'
        >
          Your Real Estate Journey Simplified
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, type: 'tween', delay: 0.4 }}
          className='max-w-[60%] text-[var(--heading-color)] text-center'
        >
          Whether you are looking for a new home, selling your property, or
          offering real estate services, Crown-Haven is your one-stop platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.5, type: 'tween', delay: 0.5 }}
          className='flex justify-center items-center gap-4 mt-4'
        >
          <Button
            styles='text-white font-semibold border-none rounded-md text-[14px] px-4 py-2 bg-[var(--primary-color)]'
            title='Find a Property'
          />
          <Button
            styles='text-[var(--secondary-color)] font-semibold border-[var(--secondary-color)] border rounded-md text-[14px] px-4 py-2 bg-transparent'
            title='Become a Partner'
          />
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
