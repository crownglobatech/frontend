"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Lock, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/app/features/auth/authSlice";
import { AppDispatch } from "@/app/store";
import { useState, useEffect } from "react";
import MyProfile from "../../general/MyProfile";

export default function ProfileDropDown() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };

    const userInitials = isMounted && user
        ? `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
        : "U";

    const userInformation = isMounted && user ? user : null;
    const userRole = isMounted && user?.role === 'service_provider' ? 'Service Provider' : user?.role

    return (
        <>
            <MyProfile open={showProfileDialog} onOpenChange={setShowProfileDialog} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="relative h-10 w-10 cursor-pointer rounded-full overflow-hidden border border-gray-200 hover:ring-2 hover:ring-[var(--primary-color)] transition-all">
                        <Avatar className="h-full w-full">
                            <AvatarImage src={userInformation?.last_name || ""} alt={userInformation?.first_name || "User"} className="object-cover rounded-full " />
                            <AvatarFallback className="bg-[var(--primary-color)] text-white font-semibold rounded-full ">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-2 z-[1000]" align="end" forceMount>
                    {/* Header */}
                    <div className="flex items-center gap-3 p-2">
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                            <Avatar className="h-full w-full rounded-xl">
                                <AvatarImage src={userInformation?.last_name || ""} className="object-cover" />
                                <AvatarFallback className="bg-gray-400 text-white rounded-xl">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-gray-900 leading-tight">
                                {userInformation?.first_name} {userInformation?.last_name}
                            </span>
                            <span className="text-xs text-gray-500 mb-1">
                                {userInformation?.email}
                            </span>
                            <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit capitalize">
                                {userRole || "User"}
                            </span>
                        </div>
                    </div>

                    <DropdownMenuSeparator className="my-2 bg-gray-100" />

                    {/* Items */}
                    <DropdownMenuGroup className="space-y-1">
                        <DropdownMenuItem
                            className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-gray-50 focus:bg-gray-50"
                            onClick={() => setShowProfileDialog(true)}
                        >
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <User size={18} className="text-gray-700" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">My Profile</span>
                                <span className="text-[11px] text-gray-400">Personal information</span>
                            </div>
                            <div className="ml-auto">
                                <span className="text-gray-300">›</span>
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-gray-50 focus:bg-gray-50"
                            onClick={() => router.push("/provider/change-password")}
                        >
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <Lock size={18} className="text-gray-700" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">Change Password</span>
                                <span className="text-[11px] text-gray-400">Update security</span>
                            </div>
                            <div className="ml-auto">
                                <span className="text-gray-300">›</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="my-2 bg-gray-100" />

                    {/* Footer */}
                    <DropdownMenuItem
                        className="flex items-center gap-3 p-3 cursor-pointer rounded-xl hover:bg-red-50 focus:bg-red-50 group"
                        onClick={handleLogout}
                    >
                        <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                            <LogOut size={18} className="text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-red-500">Sign Out</span>
                            <span className="text-[11px] text-red-300">End current session</span>
                        </div>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}