import Image from 'next/image'

interface NavProps {
  step: 'general' | 'provider'
}

export default function Nav({ step }: NavProps) {
  return (
    <div className="flex items-center gap-4">
      {/* General Information */}
      <div className="flex items-center gap-2">
        <Image
          src="/ellipse.png"
          alt="gold-circle"
          height={15}
          width={15}
          className="object-contain"
          priority
        />
        <span
          className={`font-semibold text-[14px] text-[var(--heading-color)] transition-opacity duration-500`}
        >
          General Information
        </span>
      </div>

      {/* Line */}
      <div
        className={`h-[1px] w-32 transition-all duration-500 ${
          step === 'provider' ? 'bg-black opacity-100' : 'bg-black opacity-10'
        }`}
      ></div>

      {/* Service Providers */}
      <div className="flex items-center gap-2">
        <Image
          src="/ellipse.png"
          alt="gold-circle"
          height={15}
          width={15}
          className={`transition-all duration-500 object-contain ${step === 'general' ? 'opacity-10' : 'opacity-100'}`}
          priority
        />
        <span
          className={`font-semibold text-[14px] transition-opacity duration-500 ${
            step === 'provider'
              ? 'opacity-100 text-[var(--heading-color)]'
              : 'opacity-10'
          }`}
        >
          Service Providers
        </span>
      </div>
    </div>
  )
}
