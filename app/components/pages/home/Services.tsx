import { MdHome, MdOutlineHomeWork } from "react-icons/md";
import { FaTools } from "react-icons/fa";

export default function Services() {
  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-8">
      {/* Buy a Home */}
      <div className="flex flex-col items-center bg-[var(--neutral-white)] shadow-xl hover:shadow-xl px-6 py-8 rounded-xl transition-shadow duration-300">
        <div className="bg-[var(--foundation-secondary-color)] p-4 rounded-full">
          <MdHome color="#F2994A" size={32} />
        </div>
        <span className="mt-4 font-semibold text-[20px] text-[var(--primary-color)]">
          Buy a Home
        </span>
        <p className="mt-2 max-w-[80%] text-[12px] text-[var(--foundation-neutral)] text-center">
          Find your dream home with ease. Browse verified property listings from
          trusted agents and individuals.
        </p>
      </div>

      {/* Rent a Home */}
      <div className="flex flex-col items-center bg-[var(--neutral-white)] shadow-xl hover:shadow-xl px-6 py-8 rounded-xl transition-shadow duration-300">
        <div className="bg-[var(--foundation-secondary-color)] p-4 rounded-full">
          <MdOutlineHomeWork color="#F2994A" size={32} />
        </div>
        <span className="mt-4 font-semibold text-[20px] text-[var(--primary-color)]">
          Rent a Home
        </span>
        <p className="mt-2 max-w-[80%] text-[12px] text-[var(--foundation-neutral)] text-center">
          Looking for a place to stay? Explore a wide range of rental homes that
          suit your budget and lifestyle.
        </p>
      </div>

      {/* Find a Service */}
      <div className="flex flex-col items-center bg-[var(--neutral-white)] shadow-xl hover:shadow-xl px-6 py-8 rounded-xl transition-shadow duration-300">
        <div className="bg-[var(--foundation-secondary-color)] p-4 rounded-full">
          <FaTools color="#F2994A" size={32} />
        </div>
        <span className="mt-4 font-semibold text-[20px] text-[var(--primary-color)]">
          Find a Service
        </span>
        <p className="mt-2 max-w-[80%] text-[12px] text-[var(--foundation-neutral)] text-center">
          Need help with repairs, maintenance, or specialized services? Connect
          with verified artisans and service providers near you.
        </p>
      </div>
    </div>
  );
}
