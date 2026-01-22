"use client";
import React from "react";
import Image from "next/image";
import ApartmentCard from "./components/general/ApartmentCard";
import Button from "./components/general/Button";
import Footer from "./components/general/Footer";
import Header from "./components/general/Header";
import ServiceGallery from "./components/pages/home/ServiceGallery";
import Services from "./components/pages/home/Services";
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getCustomerAdsNoAuth } from "@/lib/api";
import { CustomerAd } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import ApartmentCardSkeleton from "@/app/components/general/ApartmentCardSkeleton";

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

import { parseSmartSearch } from "@/lib/smartSearch";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [featuredAds, setFeaturedAds] = useState<CustomerAd[]>([]);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getCustomerAdsNoAuth("all");
        if (res?.data?.data) {
          setFeaturedAds(res.data.data.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to fetch featured ads", e);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Smart Parse the query
    const { search, filters } = parseSmartSearch(searchQuery);

    const params = new URLSearchParams();
    params.set("category", "all");

    // Add parsed filters
    Object.entries(filters).forEach(([key, value]) => {
      params.set(key, value);
    });

    // Add remaining search text if it has meaningful content
    if (search.length > 1) {
      params.set("search", search);
    } else {
      // If the parser extracted everything (e.g. "Rent apartment"), pass original query as fallback name 
      // OR simply rely on filters. Let's rely on filters but maybe pass full query as metadata if needed?
      // Actually, if search is empty after extraction, we don't need to pass ?search= param.
    }

    router.push(`/dashboard?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
        <div className="relative z-50 flex justify-center w-full pt-6 md:pt-8 px-4">
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
          className="relative z-20 flex flex-col justify-center items-center h-full px-4 md:px-0 mt-[-40px] md:mt-[-70px]"
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

            <motion.div variants={fadeInUp} className="flex items-center gap-2 w-full max-w-[600px] px-2 md:px-0">
              <Input
                placeholder="Search reliable real estate services"
                className="h-12 flex-1 min-w-0 px-6 text-sm md:text-base font-normal bg-white rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <span
                onClick={handleSearch}
                className="flex items-center justify-center h-12 bg-[var(--secondary-color)] text-white hover:opacity-90 cursor-pointer font-normal border-none rounded-md text-sm md:text-base px-6 transition-all shrink-0"
              >
                Search
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --- QUICK CATEGORIES & FILTER --- */}
      <section className="">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center pt-8 md:pt-[80px] pb-8"
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

        <div
          // variants={staggerContainer}
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-[1200px]"
        >
          {loadingAds ? (
            [...Array(3)].map((_, i) => (
              <ApartmentCardSkeleton key={i} />
            ))
          ) : featuredAds.length > 0 ? (
            featuredAds.map((ad) => (
              <motion.div key={ad.id} variants={fadeInUp}>
                <Link href={`/dashboard/details/${ad.id}`}>
                  <ApartmentCard
                    baths={ad.bathrooms}
                    beds={ad.bedrooms}
                    image={ad.photo_urls[0] || "/estate.png"}
                    location={`${ad.area}, ${ad.state}`}
                    price={ad.price}
                    rating={ad.average_rating || 0}
                    title={ad.title}
                    providerVerified={ad.business?.is_verified === 1}
                    status={ad.listing_type}
                  />
                </Link>
              </motion.div>
            ))
          ) : (
            // Fallback content if no ads found, maybe keep static as backup or show message?
            // User asked for "collect from real data", if empty, showing nothing might be valid or fallback.
            // I'll show a message or empty.
            <div className="col-span-full text-center text-gray-500">No properties found.</div>
          )}
        </div>

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
