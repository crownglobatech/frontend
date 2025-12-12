import Header from "../../components/Header";

interface Props {
    params: Promise<{ vendorId: number }>
}
export default async function AdminDashboard({ params }: Props) {
    const vendor = await params
    return (
        <div>
            <Header pageTitle={`Vendors / John Doe ${vendor.vendorId}`} />
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full">

            </section>
        </div>
    )
}
