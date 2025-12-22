import Header from "../components/Header";
import BookingsTable from "./BookingsTable";

export default function AdminVendors() {
    return (
        <div>
            <div className="top-0 z-[100] sticky w-full">
                <Header pageTitle="Bookings" />
            </div>
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-8">
                <BookingsTable />
            </section>
        </div>
    )
}
