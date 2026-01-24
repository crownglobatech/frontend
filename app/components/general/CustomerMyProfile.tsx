"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { selectUser } from "@/app/features/auth/authSlice";
import { Lock, PenSquare } from "lucide-react";
import { logger } from "@/lib/logger";
import { fetchProfileDetails, updateCustomerProfile } from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";
import { User } from "@/lib/types";
import { useNotification } from "@/app/contexts/NotificationProvider";

interface MyProfileProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CustomerMyProfile({ open, onOpenChange }: MyProfileProps) {
    const [user, setUser] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { notify } = useNotification()

    // Local state for form fields initialized with user data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const loadProfile = async () => {
            if (open) {
                setIsLoading(true);
                try {
                    const token = localStorage.getItem("token");
                    if (token) {
                        const response = await fetchProfileDetails(token);
                        if (response.success) {
                            setUser(response.data);
                        }
                        logger.log(response.data)
                    }
                } catch (error) {
                    logger.error("Failed to load profile", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadProfile();
    }, [open]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                phone: user.phone_e164 || "",
                address: user.business?.address_line1 || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found");

            const response = await updateCustomerProfile(token, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_e164: formData.phone,
                address: formData.address
            });

            if (response.success) {
                notify("Profile updated successfully", 'success');
                // Optionally refresh user data here or just update local user state if response returns updated user
                setUser({ ...user, ...response.data }); // Assuming API returns updated user object in data
                onOpenChange(false);
            }
        } catch (error) {
            logger.error(error);
            notify("Failed to update profile", 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const userInitials = user
        ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
        : "U";

    const userRole = user?.role === 'service_provider' ? 'Service Provider' : (user?.role || "User")

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] z-[1000] p-0 overflow-hidden bg-white min-h-[400px]">
                <DialogTitle className="sr-only">Personal Information</DialogTitle>
                {isLoading ? (
                    <div className="flex justify-center items-center h-full min-h-[400px]">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : (
                    <>
                        {/* Header / Top Section */}
                        <div className="p-6 pb-4">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-16 w-16 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src={user?.last_name || ""} className="object-cover" />
                                        <AvatarFallback className="bg-red-400 text-white text-xl font-semibold">
                                            {userInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{user?.first_name} {user?.last_name}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {userRole.replace('_', ' ')}
                                        </span>
                                        <span className="text-gray-400 text-xs">• Active</span>
                                    </div>
                                </div>
                            </div>

                            {/* Change Photo Banner */}
                            {/* <div className="bg-blue-50 text-blue-600 rounded-lg py-2 px-4 flex justify-center items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors">
                                <PenSquare size={16} />
                                <span className="text-sm font-semibold">Change Photo</span>
                            </div> */}
                        </div>

                        <DialogHeader className="px-6 pb-2">
                            <DialogTitle className="text-lg font-bold text-gray-900">Personal Information</DialogTitle>
                            <p className="text-sm text-gray-500">Manage your account details and contact information.</p>
                        </DialogHeader>

                        <div className="px-6 py-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">First Name</label>
                                    <Input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="bg-white border-gray-300 focus:border-blue-500 rounded-md"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Last Name</label>
                                    <Input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="bg-white border-gray-300 focus:border-blue-500 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            value={user?.email || ""}
                                            readOnly
                                            className="pl-9 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed rounded-md focus-visible:ring-0"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 pl-1">Contact IT to change your primary email.</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-700">Phone Number</label>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-white border-gray-300 focus:border-blue-500 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-700">Address</label>
                                <Input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="bg-white border-gray-300 focus:border-blue-500 rounded-md"
                                />
                            </div>
                        </div>

                        <DialogFooter className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-500 font-semibold hover:text-gray-700">
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isSaving} className="bg-[var(--primary-color)] hover:bg-blue-700 text-white font-semibold shadow-sm rounded-md px-6">
                                {isSaving ? <LoadingSpinner className="text-white" size="sm" /> : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
