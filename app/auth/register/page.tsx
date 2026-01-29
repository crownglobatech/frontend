"use client";
import Nav from "@/app/components/pages/auth/SignupNav";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/app/store";
import { motion } from "motion/react";
import {
  setAuthError,
  setUserId,
  setPendingEmailVerify,
} from "@/app/features/auth/authSlice";
import LoadingDots from "@/app/components/general/LoadingDots";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import EmailVerifyModal from "@/app/components/pages/auth/EmailVerifyModal";
import VerificationSuccessModal from "@/app/components/pages/auth/VerificationSuccessModal";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { logger } from "@/lib/logger";
import Categories from "@/app/components/general/Categories";
import { NIGERIAN_STATES } from "@/lib/constants";

type RegisterResponse = {
  message: string;
  user_id: number;
};
export default function SignUp() {
  const [step, setStep] = useState<"general" | "provider">("general");
  const [isACustomer, setIsACustomer] = useState(false);
  const [isAProvider, setIsAProvider] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [fullPhone, setFullPhone] = useState("");
  const [countryIso, setCountryIso] = useState("");

  // Provider form state
  const [businessName, setBusinessName] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [businessAddress1, setBusinessAddress1] = useState("");
  const [businessAddress2, setBusinessAddress2] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessCountry, setBusinessCountry] = useState("");

  const { pendingEmailVerify, userId } = useSelector(
    (state: RootState) => state.auth
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { notify } = useNotification();

  const handleCustomerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !email ||
      !fname ||
      !lname ||
      !password ||
      !passwordConfirm ||
      !fullPhone ||
      !countryIso
    ) {
      setError("All fields are required");
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    }
    setError("");
    setLoading(true);

    try {
      //  send request to backend
      const res = await fetch(
        "https://crownglobaltechltd.com/newbackend/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            first_name: fname,
            last_name: lname,
            password: password,
            password_confirmation: passwordConfirm,
            phone_country_iso: countryIso.toUpperCase(),
            phone_e164: `+${fullPhone}`,
            role: "customer",
          }),
        }
      );
      // error validation
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        notify(error.message, "error");
      }
      const data: RegisterResponse = await res.json();
      // save user id in the global state
      dispatch(setUserId({ userId: data.user_id }));
      // set pending email verfiication to true
      dispatch(setPendingEmailVerify({ verify: true }));
    } catch (err: unknown) {
      let errorMessage;
      if (err instanceof Error) {
        errorMessage = err;
      }
      logger.error(errorMessage?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !email ||
      !fname ||
      !lname ||
      !password ||
      !passwordConfirm ||
      !fullPhone ||
      !countryIso ||
      !businessName ||
      !businessAddress1 ||
      !businessCity ||
      !businessState ||
      !businessCountry
    ) {
      setError("All fields are required");
    }
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            first_name: fname,
            last_name: lname,
            password,
            password_confirmation: passwordConfirm,
            phone_country_iso: countryIso.toUpperCase(),
            phone_e164: `+${fullPhone}`,
            role: "service_provider",
            business_name: businessName,
            category_id: categoryId,
            business_address_line1: businessAddress1,
            business_address_line2: businessAddress2 || null,
            business_city: businessCity,
            business_state: businessState,
            business_country: businessCountry,
          }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        notify(data.message, "error", "Error");
        throw new Error(data.message || "Registration failed");
      }
      const data = await res.json();
      dispatch(setPendingEmailVerify({ verify: true }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      dispatch(setAuthError(errorMessage));
      logger.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const {categories} = Categories()

  return (
    <div className="relative flex md:flex-row flex-col w-full min-h-screen">
      {/* Left side */}
      <div className="top-0 sticky flex flex-col justify-between bg-[var(--primary-color)] px-8 py-16 w-full md:w-1/2 min-h-screen">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-[var(--font-md)]"
        >
          <span className="font-thin text-[var(--neutral-white)]/70">
            Crown-
          </span>
          <span className="font-extrabold text-[var(--neutral-white)]">
            Haven
          </span>
        </motion.div>
        <div>
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="max-w-[90%] font-bold text-[32px] text-white md:text-[50px] leading-tight"
          >
            Start Something New with Crown-Haven
          </motion.h2>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="pt-4 max-w-[90%] font-thin text-white/70"
          >
            Join a community built on trust and opportunity. Whether you’re
            searching for a home or offering your services, Crown-Haven connects
            you with the right people. Enjoy secure transactions, verified
            profiles, and reliable support. Your journey to growth begins here.
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <span className="text-[12px] text-[var(--neutral-white)]/70">
            &copy; 2025 Crown-Haven. All rights reserved.
          </span>
        </motion.div>
      </div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "easeIn",
        }}
        className="relative flex-1 bg-white px-16 py-16 w-full md:w-1/2 h-screen overflow-y-auto"
      >
        <div className="top-4 right-16 absolute">
          <span className="text-[12px] text-[var(--foundation-neutral)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[var(--primary-color)]"
            >
              Sign in
            </Link>
          </span>
        </div>

        {/* progress bar */}
        <div className="">
          <Nav step={step} />
        </div>
        {/* General Step */}
        {step === "general" && (
          <form
            className="flex flex-col gap-4 mx-auto mt-8 max-w-[500px]"
            onSubmit={handleCustomerSubmit}
          >
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Amos"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Oluwapelumi"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"ng"} // default Nigeria
                value={fullPhone}
                onChange={(val, country: CountryData) => {
                  setFullPhone(val); // e.g. "2349121482621"
                  setCountryIso(country?.countryCode.toUpperCase()); // e.g. "NG"
                }} // val comes like "2349121482621"
                enableSearch={true}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  fontSize: "14px",
                }}
                buttonStyle={{
                  border: "none",
                  background: "transparent",
                }}
                dropdownStyle={{
                  maxHeight: "200px",
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm pr-10"
                  required
                  placeholder="@Peter2001"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm pr-10"
                  required
                  placeholder="@Peter2001"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                I’m a … <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-[14px] text-[var(--foundation-neutral)]">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={isACustomer}
                    onChange={() => {
                      setIsAProvider(false);
                      setIsACustomer(true);
                    }}
                    className="text-[8px] text-[var(--foundation-neutral)]"
                  />
                  Customer
                </label>
                <label className="flex items-center gap-2 text-[14px] text-[var(--foundation-neutral)]">
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={isAProvider}
                    onChange={() => {
                      setIsACustomer(false);
                      setIsAProvider(true);
                    }}
                    className="text-[13px] text-[var(--foundation-neutral)]"
                  />
                  Service Provider
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex justify-end">
                {isAProvider ? (
                  <button
                    type="button"
                    className="bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-white text-sm cursor-pointer"
                    onClick={() => setStep("provider")}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[var(--primary-color)] disabled:opacity-30 px-6 py-2 rounded-md font-semibold text-white text-sm cursor-pointer disabled:cursor-not-allowed"
                    disabled={!isACustomer || loading}
                  >
                    {loading ? <LoadingDots /> : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </form >
        )
        }
        {
          pendingEmailVerify && (
            <EmailVerifyModal
              userEmail={email}
              onOpenChange={(open) =>
                dispatch(setPendingEmailVerify({ verify: open }))
              }
              open={pendingEmailVerify}
              onSuccess={() => {
                dispatch(setPendingEmailVerify({ verify: false }));
                setShowSuccessModal(true);
              }}
            />
          )
        }
        <VerificationSuccessModal
          open={showSuccessModal}
          onOpenChange={setShowSuccessModal}
        />

        {/* Provider Step */}
        {
          step === "provider" && (
            <form
              className="flex flex-col gap-4 mx-auto mt-16 max-w-[500px]"
              onSubmit={handleProviderSubmit}
            >
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Business Type / Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId || ""}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  required
                >
                  <option value="" disabled>
                    Select Business Type
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Business Address 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Address line 1"
                  value={businessAddress1}
                  onChange={(e) => setBusinessAddress1(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  required
                />
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                    Business Address 2
                  </label>
                  <input
                    type="text"
                    value={businessAddress2}
                    onChange={(e) => setBusinessAddress2(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={businessCity}
                    onChange={(e) => setBusinessCity(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  />
                </div>
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={businessCountry}
                    onChange={(e) => setBusinessCountry(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option value="NG">Nigeria</option>
                    <option value="Uk">United Kingdom</option>
                    {/* Add more countries */}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={businessState}
                    onChange={(e) => setBusinessState(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    required
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setStep("general");
                    setIsAProvider(false);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-white text-sm cursor-pointer"
                  disabled={loading}
                >
                  {loading ? <LoadingDots /> : "Submit"}
                </button>
              </div>
              {/* {error && <p className='text-red-600'>{error}</p>} */}
            </form>
          )
        }
      </motion.div >
    </div >
  );
}
