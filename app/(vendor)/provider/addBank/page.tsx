"use client";

import { useNotification } from "@/app/contexts/NotificationProvider";
import { getAllBankDetails } from "@/lib/utils";
import { resolveAccountDetails, saveBankDetails } from "@/lib/api";
import { useEffect, useState } from "react";
import Loader from "@/app/components/general/Loader";
import HeaderBanner from "@/app/components/pages/vendor-dashboard/HeadBanner";
import { Wallet, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { logger } from "@/lib/logger";
import LoadingSpinner from "@/app/components/general/LoadingSpinner";

interface Bank {
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string;
    pay_with_bank: boolean;
    active: boolean;
    is_deleted: boolean;
    country: string;
    currency: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export default function AddPaymentDetails() {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loadingBanks, setLoadingBanks] = useState<boolean>(true);
    const { notify } = useNotification();

    // Form State
    const [selectedBankCode, setSelectedBankCode] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("");
    const [resolvingAccount, setResolvingAccount] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await getAllBankDetails();
                const sortedBanks = (response || []).sort((a: Bank, b: Bank) =>
                    a.name.localeCompare(b.name)
                );
                setBanks(sortedBanks);
                logger.log(sortedBanks)
            } catch (error) {
                notify(
                    error instanceof Error ? error.message : "Failed to load banks",
                    "error",
                    "Error"
                );
            } finally {
                setLoadingBanks(false);
            }
        };
        fetchBanks();
    }, []);

    // Resolve Account Handler
    const handleResolveAccount = async () => {
        if (accountNumber.length !== 10 || !selectedBankCode) return;

        setResolvingAccount(true);
        setAccountName("");

        try {
            const response = await resolveAccountDetails(accountNumber, selectedBankCode);
            if (response?.data?.account_name) {
                setAccountName(response.data.account_name);
            }
        } catch (error) {
            // Clear invalid account name
            setAccountName("");
            logger.error(error)
        } finally {
            setResolvingAccount(false);
        }
    };

    // Auto-resolve when both fields are ready
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (accountNumber.length === 10 && selectedBankCode) {
                handleResolveAccount();
            }
        }, 1000); // Debounce resolution

        return () => clearTimeout(timeoutId);
    }, [accountNumber, selectedBankCode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // include accountname in this condition when migrted to live mode
        if (!selectedBankCode || !accountNumber) {
            notify("Please ensure all fields are verified", "error", "Incomplete");
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            logger.log(selectedBankCode, accountNumber)
            if (!token) throw new Error("Authentication required");
            await saveBankDetails(token, {
                bank_code: selectedBankCode,
                account_number: accountNumber,
            });

            notify("Bank details saved successfully!", "success", "Saved");
            // Optional: Redirect or clear form
            setAccountNumber("");
            setAccountName("");
            setSelectedBankCode("");

        } catch (error) {
            notify(
                error instanceof Error ? error.message : "Failed to save details",
                "error",
                "Save Failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingBanks) return (
        <div className="w-full h-screen flex justify-center items-center">
            <Loader />
        </div>
    );

    return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
        {/* Sticky Header to match Dashboard */}
        <div className="top-0 sticky w-full z-10">
            <HeaderBanner />
        </div>

        <div className="flex flex-col p-6 mt-6 max-w-5xl mx-auto w-full">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--heading-color)] flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-[var(--primary-color)]" />
                    Payment Settings
                </h1>
                <p className="text-gray-500 mt-1">Manage your bank account details for payouts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl border border-[var(--foundation-neutral-6)] shadow-sm p-6 md:p-8">
                        <h2 className="text-lg font-semibold text-[var(--heading-color)] mb-6 flex items-center gap-2">
                            Add New Bank Account
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {/* Bank Selection */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="bank" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <Building2 className="w-4 h-4 text-gray-400" />
                                    Select Bank
                                </label>
                                <div className="relative">
                                    <select
                                        id="bank"
                                        value={selectedBankCode}
                                        onChange={(e) => {
                                            setSelectedBankCode(e.target.value);
                                            setAccountName("");
                                        }}
                                        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] bg-white transition-all appearance-none cursor-pointer hover:border-[var(--primary-color)]/50"
                                        required
                                    >
                                        <option value="">Select your bank...</option>
                                        {banks.map((bank) => (
                                            <option key={bank.id} value={bank.code}>
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Account Number */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                                    Account Number
                                </label>
                                <input
                                    id="accountNumber"
                                    type="text"
                                    maxLength={10}
                                    value={accountNumber}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "");
                                        setAccountNumber(val);
                                        setAccountName("");
                                    }}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all font-mono text-lg tracking-wide placeholder:font-sans placeholder:tracking-normal placeholder:text-base placeholder:text-gray-400"
                                    placeholder="0123456789"
                                    required
                                />
                            </div>

                            {/* Account Name Display */}
                            <div className="flex flex-col gap-2 transition-all duration-300 ease-in-out">
                                <div className="">
                                    <label className="text-sm font-medium text-gray-700">Account Name</label>
                                    {resolvingAccount && <span className="text-xs text-[var(--primary-color)] font-medium animate-pulse flex items-center gap-2"><LoadingSpinner size="lg" variant="primary" /> Verifying...</span>}
                                </div>

                                <div className={`w-full p-4 border rounded-lg flex items-center gap-3 transition-colors duration-300 ${accountName
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : resolvingAccount
                                        ? "bg-gray-50 border-gray-200 text-gray-400"
                                        : "bg-gray-50 border-gray-100 text-gray-400"
                                    }`}>
                                    {accountName ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <span className="font-semibold">{accountName}</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-5 h-5 opacity-40 flex-shrink-0" />
                                            <span className="italic">{resolvingAccount ? "Locating account details..." : "Account details will appear here"}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                // include || !accountName || resolvingAccount when production
                                disabled={submitting}
                                className={`mt-4 w-full py-4 px-6 rounded-lg text-white font-semibold text-base transition-all transform active:scale-[0.99] shadow-sm flex justify-center cursor-pointer items-center gap-2 ${submitting || !selectedBankCode || !accountNumber
                                    ? "bg-gray-300 cursor-not-allowed opacity-70"
                                    : "bg-[var(--primary-color)] hover:shadow-md hover:bg-[var(--primary-color)]/90"
                                    }`}
                            >
                                {submitting ? (
                                    <div>
                                        <LoadingSpinner size="sm" variant="primary" /> <span className="text-[#1E5AA8]">Saving...</span>
                                    </div>
                                ) : (
                                    "Save Bank Details"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Info/Helper */}
                <div className="md:col-span-1 hidden md:block">
                    <div className="bg-[var(--primary-color)]/5 rounded-xl border border-[var(--primary-color)]/10 p-6">
                        <h3 className="text-[var(--primary-color)] font-semibold mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Important Info
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] mt-2 flex-shrink-0"></span>
                                Ensure the account name matches your registered vendor profile name to avoid payout delays.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] mt-2 flex-shrink-0"></span>
                                Double check your account number before saving.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] mt-2 flex-shrink-0"></span>
                                Payouts are processed within 24 hours of request.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)] mt-2 flex-shrink-0"></span>
                                Payments are secured by Paystack.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
