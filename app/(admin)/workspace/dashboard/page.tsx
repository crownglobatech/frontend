import Header from "../components/Header";
import { Select, SelectTrigger } from '@/components/ui/select'
import ActivityTable from "./components/ActivityTable";
export default function AdminDashboard() {
    const dashboardData = [
        {
            title: 'Total Users',
            count: '1,245'
        }, {
            title: 'Total Vendors',
            count: '312'
        }, {
            title: 'Active Bookings',
            count: '89'
        }, {
            title: 'Pending Verification',
            count: '15'
        },
    ]
    return (
        <div>
            <div className="top-0 z-[1000] sticky w-full">
                <Header pageTitle="Dashboard Overview" />
            </div>
            {/* content */}
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center">
                    {dashboardData.map((data, index) => (
                        <div key={index} className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm">
                            <h2 className="font-semibold text-black text-[12px]">{data.title}</h2>
                            <p className="font-semibold text-black text-[25px]">{data.count}</p>
                        </div>
                    ))}
                </div>

                {/* overview table */}
                <div className="bg-white rounded-sm p-4 mt-8 w-full">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-[14px]">Recent Activities</h2>
                        <Select>
                            <SelectTrigger className="text-[var(--text-body)] text-[12px]">
                                This Week
                            </SelectTrigger>
                        </Select>
                    </div>
                    {/* table */}
                    <div className="mt-2">
                        <ActivityTable />
                    </div>
                </div>
            </section>
        </div>
    )
}
