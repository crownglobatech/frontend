"use client";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import CreateFeedback from "./CreateFeedback";
export default function VendorFaq() {
  return (
    <div className="flex flex-col">
      <div className="top-0 z-[1000] sticky bg-white shadow-lg px-6 py-4 w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[20px] text-[var(--heading-color)]">
            Help & Support
          </h2>
          {/* Icons */}
          <div className="flex flex-row-reverse items-center gap-8">
            <div className="shadow-md rounded-full">
              <Image
                src="/user.png"
                alt="vendor profile avatar"
                className="object-contain cursor-pointer"
                height={40}
                width={40}
              />
            </div>
            <div className="shadow-md rounded-full">
              <Image
                src="/notify.png"
                alt="notification icon"
                className="object-contain cursor-pointer"
                height={40}
                width={40}
              />
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="px-20 pb-4">
        {/* intro */}
        <div className="mx-auto mt-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-[25px]">
                How can we help you?
              </h1>
              <p className="text-[14px] text-[var(--text-body)]">
                We&apos;re here to help you with anything you need, Find
                answers, contact supports, or leave us feedback.
              </p>
            </div>
            <div className="relative">
              {/* search */}
              <input
                type="text"
                placeholder="Search topics, or questions..."
                className="py-1.5 pl-4 border border-[var(--foundation-color)] rounded-sm w-[400px] text-[14px] text-[var(--foundation-neutral-6)]"
              />
              <FaMagnifyingGlass
                className="top-2 right-4 absolute text-[#BFBFBF]"
                size={15}
              />
            </div>
          </div>
        </div>
        {/* faq */}
        <div className="mt-8">
          <h1 className="font-semibold text-[20px] text-black">
            Frequently Asked Questions
          </h1>
          <div className="space-y-3 mx-4 mt-4">
            <details className="group pb-3 border-b">
              <summary className="flex justify-between items-center py-2 font-medium text-[16px] cursor-pointer">
                <span className="text-[12px]">How do I reset my password?</span>

                {/* Chevron Icon */}
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-2 text-[14px] text-gray-600 leading-relaxed">
                Go to your account settings, select &quot;Security,&quot; and
                choose &quot;Reset Password.&quot;
              </div>
            </details>
            <details className="group pb-3 border-b">
              <summary className="flex justify-between items-center py-2 font-medium text-[16px] cursor-pointer">
                <span className="text-[12px]">How do I upgrade my plan?</span>

                {/* Chevron Icon */}
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-2 text-[14px] text-gray-600 leading-relaxed">
                Go to your account settings, select &quot;Security,&quot; and
                choose &quot;Reset Password.&quot;
              </div>
            </details>
            <details className="group pb-3 border-b">
              <summary className="flex justify-between items-center py-2 font-medium text-[16px] cursor-pointer">
                <span className="text-[12px]">
                  How do I edit an ad i already posted?
                </span>

                {/* Chevron Icon */}
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-2 text-[14px] text-gray-600 leading-relaxed">
                Go to your account settings, select &quot;Security,&quot; and
                choose &quot;Reset Password.&quot;
              </div>
            </details>
          </div>
        </div>
        {/* contact support */}
        <div className="mt-8">
          <h1 className="font-semibold text-[20px] text-black">
            Contact Support
          </h1>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-1 items-center gap-2 bg-[#F0F0F0] p-2 rounded-sm">
              {/* icon */}
              <div className="bg-white px-2 py-2 rounded-full">
                <MailIcon className="text-black" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-black">
                  Email Us
                </h3>
                <p className="text-[13px] text-[var(--text-body)]">
                  Get in touch with us via email for urgent request/queries
                </p>
                <span className="text-[13px] text-[var(--primary-color)] underline">
                  support@crown-haven.com
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 bg-[#F0F0F0] p-2 rounded-sm">
              {/* icon */}
              <div className="bg-white px-2 py-2 rounded-full">
                <PhoneCallIcon className="text-black" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-black">
                  Call Us
                </h3>
                <p className="text-[13px] text-[var(--text-body)]">
                  Mon - Fri, 9am - 5pm WAT
                </p>
                <span className="text-[13px] text-[var(--primary-color)] underline">
                  +2349012536748
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* feedback */}
        <div className="mt-8">
          <h1 className="font-semibold text-[20px] text-black">
            Provide Feedback
          </h1>
          <CreateFeedback />
        </div>
      </div>
    </div>
  );
}
