"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileDropdown from "@/app/components/general/ProfileDropDown";
import { changePasswordFromProfile } from "@/lib/api";
import { useNotification } from "@/app/contexts/NotificationProvider";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import { AppDispatch } from "@/app/store";
import NotificationDropDown from "@/app/(customer)/dashboard/components/NotificationDropDown";
import NotificationDropdown from "../pages/vendor-dashboard/NotificationDropdown";
import { changeCustomerPassword } from "@/lib/api";

export default function ChangePassword() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    // Form State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const { notify } = useNotification()
    const user =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const role =
        typeof window != "undefined" ? localStorage.getItem("role") : null;
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        router.back();
    }
    useEffect(() => {
        const checkLogin = () => {
            if (!user) {
                setIsLoggedIn(false);
                router.push('/auth/login');
            } else {
                setIsLoggedIn(true);
            }
        };
        checkLogin();
    }, [user, router]);

    // Strength Logic
    const calculateStrength = (password: string) => {
        let score = 0;
        if (password.length > 0) {
            if (password.length >= 8) score++;
            if (/\d/.test(password)) score++;
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        }
        return score;
    };

    const strengthScore = calculateStrength(newPassword);

    const getStrengthLabel = (score: number) => {
        if (score === 0) return "Use a strong password";
        if (score <= 1) return "Weak";
        if (score === 2) return "Medium";
        return "Strong";
    };

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-gray-200";
        if (score <= 1) return "bg-red-500";
        if (score === 2) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthTextColor = (score: number) => {
        if (score === 0) return "text-gray-500";
        if (score <= 1) return "text-red-500";
        if (score === 2) return "text-yellow-500";
        return "text-green-600";
    };

    const getStrengthWidth = (score: number) => {
        if (score === 0) return "w-0";
        if (score <= 1) return "w-1/3";
        if (score === 2) return "w-2/3";
        return "w-full";
    };

    const changePassword = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");
            if (newPassword !== confirmPassword) {
                setLoading(false)
                return notify("Passwords do not match", "error", "Error");
            }
            let res;
            if (role === 'customer') {
                res = await changeCustomerPassword(token, {
                    old_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmPassword
                });
            } else {
                res = await changePasswordFromProfile(token, {
                    old_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmPassword
                });
            }
            notify(res.message, "success", "Success");
            dispatch(logout());
            router.push("/auth/login");
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to change password";
            notify(errorMessage, "error", "Error");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* --- Top Bar --- */}
            <div className="sticky top-0 flex justify-between items-center gap-[50px] bg-white shadow-sm px-6 py-4">
                <div className="flex gap-2 w-full">
                    <Input
                        type="text"
                        placeholder="Search for homes and services"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-sm w-full text-[12px] placeholder:text-[12px] placeholder:text-[#BFBFBF]"
                    />
                </div>

                {isLoggedIn && (
                    <div className="relative flex flex-row-reverse items-center gap-4">
                        <div className='shadow-sm rounded-full'>
                            <ProfileDropdown />
                        </div>
                        {role === 'service_provider' ? (
                            <div className="shadow-sm rounded-full">
                                <NotificationDropdown />
                            </div>
                        ) : null}
                    </div>
                )}
            </div>


            <div className="flex justify-center items-center py-10 flex-grow">
                <div className="bg-white shadow-sm p-8 border rounded-lg w-full max-w-[500px]">
                    <div className="mb-6 text-center">
                        <h1 className="mb-2 font-bold text-2xl text-gray-900">Change Password</h1>
                        <p className="text-gray-500 text-sm">
                            Ensure your account is using a long, random password to stay secure.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-1.5">
                            <label className="font-semibold text-gray-700 text-sm">Current Password</label>
                            <div className="relative">
                                <Input
                                    type={showCurrent ? "text" : "password"}
                                    placeholder="Enter current password"
                                    className="pr-10 bg-gray-50"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2"
                                >
                                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label className="font-semibold text-gray-700 text-sm">New Password</label>
                            <div className="relative">
                                <Input
                                    type={showNew ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="pr-10 bg-gray-50"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2"
                                >
                                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-1.5">
                            <label className="font-semibold text-gray-700 text-sm">Confirm New Password</label>
                            <div className="relative">
                                <Input
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-type new password"
                                    className="pr-10 bg-gray-50"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2"
                                >
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Strength Indicator */}
                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Security strength</span>
                                <span className={`font-semibold ${getStrengthTextColor(strengthScore)} transition-colors`}>
                                    {getStrengthLabel(strengthScore)}
                                </span>
                            </div>
                            <div className="bg-gray-100 rounded-full w-full h-1.5 overflow-hidden">
                                <div className={`${getStrengthColor(strengthScore)} ${getStrengthWidth(strengthScore)} h-full transition-all duration-300 ease-in-out`}></div>
                            </div>
                            <p className="text-[11px] text-gray-400 italic">
                                Include at least 8 characters, one number, and one special character.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button onClick={changePassword} className="w-full bg-[var(--primary-color)] hover:bg-blue-600 text-white font-semibold h-10">
                                {loading ? <LoadingSpinner className="text-white" size='md' /> : 'Update Password'}
                            </Button>
                        </div>

                        <div className="text-center">
                            <a href="#" onClick={handleBack} className="font-semibold text-[var(--primary-color)] text-sm hover:underline cursor-pointer">
                                Cancel
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}