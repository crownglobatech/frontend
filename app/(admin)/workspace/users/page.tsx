import Header from "../components/Header";
import UserTable from "./components/UserTable";

export default function AdminUsers() {
    return (
        <div>
            <div className="top-0 z-[1000] sticky w-full">
                <Header pageTitle="Users" />
            </div>
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
                <div>
                    <h2 className="text-black font-semibold text-[16px]">Manage Users</h2>
                    <p className="text-black font-normal text-[14px]">View, search, and manage user accounts on the platform</p>
                </div>
                <div className="mt-4">
                    <UserTable />
                </div>

            </section>
        </div>
    )
}
