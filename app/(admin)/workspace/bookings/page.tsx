import Header from "../components/Header";
import BookingsTable from "./BookingsTable";

export default function AdminVendors() {
    return (
        <div>
            <Header pageTitle="Bookings" />
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-8">
                <BookingsTable />
            </section>
        </div>
    )
}
