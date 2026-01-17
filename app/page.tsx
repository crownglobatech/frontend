"use client";
import React from "react";
import Image from "next/image";
import ApartmentCard from "./components/general/ApartmentCard";
import Button from "./components/general/Button";
import Footer from "./components/general/Footer";
import Header from "./components/general/Header";
import HomeFilter from "./components/pages/home/HomeFilter";
import ServiceGallery from "./components/pages/home/ServiceGallery";
import Services from "./components/pages/home/Services";
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const fadeInScale: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="overflow-hidden w-full min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col w-full h-[85vh] md:h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/herobg.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1E5AA882] via-[#1E5AA882] via-[51%] to-[#0C2342F0] to-[94%] pointer-events-none" />

        {/* Header Container */}
        <div className="relative z-20 flex justify-center w-full pt-6 md:pt-8 px-4">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-[95%] md:max-w-[85%]"
          >
            <Header />
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-0 mt-[-60px] md:mt-0"
        >
          <div className="flex flex-col justify-center items-center max-w-full md:max-w-[700px] text-center space-y-4 md:space-y-6">
            <motion.h1
              variants={fadeInUp}
              className="font-bold text-[36px] items-center leading-tight md:text-[56px] text-white drop-shadow-md"
            >
              Find Your Perfect{" "}
              <span className="text-[var(--secondary-color)]">Property</span>{" "}
              And Trusted Service
            </motion.h1>

            <motion.h3
              variants={fadeInUp}
              className="font-normal text-white text-base md:text-xl drop-shadow-md max-w-[90%] md:max-w-full mx-auto"
            >
              Search properties, connect with verified agents, and access
              reliable real estate services all in one platform.
            </motion.h3>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center items-center gap-4 pt-2"
            >
              <Button
                styles="bg-[var(--primary-color)] text-white hover:bg-opacity-90 font-semibold border-none rounded-md text-sm md:text-base px-6 py-3 transition-all"
                title="View Property"
                event={() => router.push("/dashboard?category=all")}
              />
              <Button
                styles="bg-transparent border border-white text-white hover:bg-white hover:text-[var(--primary-color)] font-semibold rounded-md text-sm md:text-base px-6 py-3 transition-all"
                title="Contact Now"
                event={() => router.push("/about#contact")}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- QUICK CATEGORIES & FILTER --- */}
      <section className="relative my-10 md:my-16">
        {/* Filter - Floating (Desktop Only as per original design intention) */}
        <div className="hidden md:block absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[900px] z-20">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HomeFilter />
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center pt-8 md:pt-[120px] pb-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-bold text-2xl md:text-[28px] text-[var(--heading-color)] mb-8"
          >
            Quick Categories
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-full px-6 md:px-16">
            <Services />
          </motion.div>
        </motion.div>
      </section>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="flex flex-col items-center bg-[var(--foundation-primary)] py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-bold text-2xl md:text-[28px] text-[var(--heading-color)]"
        >
          Featured Properties
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-[1200px]"
        >
          <motion.div variants={fadeInUp}>
            <ApartmentCard
              baths={3}
              beds={4}
              image="/estate.png"
              location="Agodi Awolowo, Ibadan"
              price="50000000"
              rating={5}
              title="Vineyard Estate"
              providerVerified={true}
              status="For Sale"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ApartmentCard
              baths={3}
              beds={4}
              image="/estate.png"
              location="Agodi Awolowo, Ibadan"
              price="50000000"
              rating={5}
              title="Vineyard Estate"
              providerVerified={true}
              status="For Rent"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ApartmentCard
              baths={3}
              beds={4}
              image="/estate.png"
              location="Agodi Awolowo, Ibadan"
              price="50000000"
              rating={5}
              title="Vineyard Estate"
              providerVerified={true}
              status="For Sale"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <Button
            styles="border border-[var(--primary-color)] rounded-md text-sm capitalize text-[var(--primary-color)] font-semibold px-6 py-2 bg-transparent hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
            title="View All Properties"
            event={() => router.push("/dashboard?category=all")}
          />
        </motion.div>
      </section>

      {/* --- RELIABLE SERVICE (Desktop Only) --- */}
      <section className="hidden md:flex flex-col items-center my-12 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-bold text-[30px] text-[var(--heading-color)]"
        >
          Need a reliable service?
        </motion.h2>

        <div className="w-full px-16 max-w-[1400px]">
          <ServiceGallery />
        </div>
      </section>

      {/* --- BANNER / CTA --- */}
      <motion.section
        variants={fadeInScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col justify-center items-center gap-6 bg-[var(--foundation-neutral-4)] mx-4 md:mx-auto md:max-w-[80%] my-12 py-12 px-6 rounded-lg text-center"
      >
        <h2 className="font-bold text-2xl md:text-[32px] text-[var(--heading-color)] max-w-2xl leading-tight">
          Your Real Estate Journey Simplified
        </h2>
        <p className="text-[var(--heading-color)] text-base md:text-lg max-w-xl opacity-80">
          Whether you are looking for a new home, selling your property, or
          offering real estate services, Crown-Haven is your one-stop platform.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
          <Button
            styles="bg-[var(--primary-color)] text-white hover:bg-opacity-90 font-semibold border-none rounded-md text-sm px-6 py-3 transition-transform hover:scale-105"
            title="Find a Property"
            event={() => router.push("/dashboard?category=all")}
          />
          <Button
            styles="border border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold hover:bg-[var(--secondary-color)] hover:text-white bg-transparent rounded-md text-sm px-6 py-3 transition-colors duration-300"
            title="Become a Partner"
            event={() => router.push("/about#contact")}
          />
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
