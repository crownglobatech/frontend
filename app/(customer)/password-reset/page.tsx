import ChangePassword from "@/app/components/general/ChangePassword";
import Header from "@/app/components/pages/user_dashboard/Header";

export default function ChangePasswordPage() {
    return (
        <div>
            <Header pageTitle="Reset Password" />
            <ChangePassword />
        </div>
    )
}