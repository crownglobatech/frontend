'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function ServiceGallery () {
  return (
    <div className='gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto p-4 max-w-7xl'>
      {/* Card Template */}
      {[
        {
          src: '/plumbing.png',
          alt: 'A plumber working under a kitchen sink',
          title: 'Plumbing',
          delay: 0.1,
          initial: {
            x: 100,
            opacity: 0
          },
          inView: {
            x: 0,
            opacity: 100
          },
          text: 'Keep your home running smoothly with reliable plumbing services. From fixing leaks to full installations, our verified professionals have you covered.'
        },
        {
          src: '/paint.png',
          alt: 'A person painting a wall with a roller',
          title: 'Painting',
          delay: 0.2,
          initial: {
            y: 100,
            opacity: 0
          },
          inView: {
            y: 0,
            opacity: 100
          },
          text: 'Transform your space with vibrant, high-quality painting services. Skilled painters deliver clean finishes and durable results. Give your home or office the refresh it deserves.',
          span: 'col-span-1 sm:col-span-2'
        },
        {
          src: '/carpenttry.png',
          alt: 'A carpenter working on wood',
          title: 'Carpentry',
          delay: 0.3,
          initial: {
            x: 100,
            opacity: 0
          },
          inView: {
            x: 0,
            opacity: 100
          },
          text: 'Expert carpenters for furniture, repairs, and custom builds. Quality woodwork that lasts and adds style to your home.'
        },
        {
          src: '/truck.png',
          alt: 'Moving truck',
          title: 'Moving Services',
          delay: 0.4,
          initial: {
            y: 100,
            opacity: 0
          },
          inView: {
            y: 0,
            opacity: 100
          },
          text: 'Stress-free relocation made easy by trusted movers. From packing to safe delivery, we handle your items with care. Move into your new space with peace of mind.'
        },
        {
          src: '/service.png',
          alt: 'Cleaning service',
          delay: 0.5,
          initial: {
            x: 100,
            opacity: 0
          },
          inView: {
            x: 0,
            opacity: 100
          },
          title: (
            <span className='flex items-center gap-2'>
              More Services <FaArrowRight size={18} color='white' />
            </span>
          ),
          text: 'Explore even more trusted home and allied services. From moving to painting and beyond, we’ve got experts for all your needs. Click to see the full list.'
        }
      ].map(({ src, alt, title, text, span, initial, inView, delay }, i) => (
        <motion.div
          initial={initial}
          whileInView={inView}
          transition={{ duration: 0.5, type: 'tween', delay: delay }}
          key={i}
          className={`group relative shadow-xl rounded-md w-full h-64 overflow-hidden ${
            span || ''
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className='rounded-md object-cover group-hover:scale-105 transition-transform duration-300'
          />
          {/* Overlay */}
          <div className='absolute inset-0 flex flex-col justify-end items-start bg-[linear-gradient(178.81deg,rgba(102,102,102,0.52)_1.02%,rgba(51,51,51,0.92)_43.71%,rgba(0,0,0,0.91)_76.72%)] opacity-0 group-hover:opacity-100 px-4 transition-opacity duration-300'>
            <h2 className='font-semibold text-[var(--secondary-color)] text-xl md:text-2xl lg:text-3xl'>
              {title}
            </h2>
            <p className='mb-4 max-w-[90%] text-[var(--foundation-neutral-4)] text-xs md:text-sm'>
              {text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
