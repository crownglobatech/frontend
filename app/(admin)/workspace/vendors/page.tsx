import Header from "../components/Header";
import VendorTable from "./components/VendorTable";

export default function AdminVendors() {
    return (
        <div>
            <div className="top-0 z-[100] sticky w-full">

                <Header pageTitle="Vendors" />
            </div>
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
                <div>
                    <h2 className="text-black font-semibold text-[16px]">Manage Vendors</h2>
                    <p className="text-black font-normal text-[14px]">View, search, and manage vendor accounts on the platform</p>
                </div>

                <div>
                    <div className="mt-4">
                        <VendorTable />
                    </div>
                </div>
            </section>
        </div>
    )
}
