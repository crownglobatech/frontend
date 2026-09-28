import ChangePassword from "@/app/components/general/ChangePassword";
import Header from "@/app/components/pages/vendor-dashboard/Header";

export default function ChangeProviderPasswordPage() {
    return (
        <div>
            <Header pageTitle="Change Password" />
            <ChangePassword />
        </div>
    )
}