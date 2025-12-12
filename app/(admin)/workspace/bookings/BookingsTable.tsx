import { Input } from "@/components/ui/input"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaMagnifyingGlass } from "react-icons/fa6"
export default function BookingsTable() {
    const data = [
        {
            bookingId: 'CH-12345',
            customer: 'John Doe',
            vendor: 'Peter Omoh',
            service: 'Electrical',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'Sarah Jackson',
            vendor: 'Peter Omoh',
            service: 'Cleaning',
            status: 'completed',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'John Doe',
            vendor: 'Peter Omoh',
            service: 'Electrical',
            status: 'ongoing',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'Sarah Jackson',
            vendor: 'Peter Omoh',
            service: 'Cleaning',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'John Doe',
            vendor: 'Peter Omoh',
            service: 'Electrical',
            status: 'completed',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'Sarah Jackson',
            vendor: 'Peter Omoh',
            service: 'Cleaning',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'John Doe',
            vendor: 'Peter Omoh',
            service: 'Electrical',
            status: 'ongoing',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'Sarah Jackson',
            vendor: 'Peter Omoh',
            service: 'Cleaning',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        }
        ,
        {
            bookingId: 'CH-12345',
            customer: 'John Doe',
            vendor: 'Peter Omoh',
            service: 'Electrical',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        },
        {
            bookingId: 'CH-12345',
            customer: 'Sarah Jackson',
            vendor: 'Peter Omoh',
            service: 'Cleaning',
            status: 'cancelled',
            amount: '50,000,000',
            date: '2025-10-26'
        }
    ]
    return (
        <>
            <div className='bg-white p-4 rounded-sm'>
                {/* search */}
                <div className="flex justify-between items-center gap-8">
                    <div className="relative w-full">
                        <Input className="bg-white rounded-sm text-[#8C8C8C] placeholder:text-[#8C8C8C] placeholder:text-[12px] text-[12px]" placeholder="Search by name, customer...">

                        </Input>
                        <FaMagnifyingGlass className="absolute right-2 top-2" color="#BFBFBF" />
                    </div>
                    <div className="flex gap-4">
                        <Select>
                            <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">Service</SelectTrigger>
                        </Select>
                        <Select>
                            <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">Select All</SelectTrigger>
                        </Select>
                    </div>
                </div>

                <Table className='max-h-20 overflow-y-scroll scrollbar-hide mt-4'>
                    <TableHeader className="bg-[var(--foundation-neutral-6)]">
                        <TableRow className='bg-[var(--foundation-neutral-4)]'>
                            <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
                                Booking-ID
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Customer
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Vendor
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Service
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Status
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Amount
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {!data ? (
                            <TableRow>
                                <TableCell
                                    colSpan={14}
                                    className='py-6 text-[var(--foundation-neutral-8)] text-center'
                                >
                                    No performance data available yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((data, index) => (
                                <TableRow key={index} className='border-none'>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.bookingId}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.customer}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.vendor}</TableCell>
                                    <TableCell className="text-[var(--heading-color)] text-[12px]"> {data.service}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${data.status === 'ongoing'
                                                ? 'bg-[#D4E6FF] text-[var(--primary-color)]'
                                                : data.status === 'completed'
                                                    ? 'bg-[#C8FFD5] text-[var(--success-color)]'
                                                    : 'bg-[#FFD3D3] text-[#E63946]'
                                                }`}
                                        >
                                            {data.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.amount}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.date}</TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center mt-2">
                <span className="text-[12px] text-[var(--text-body)]">Showing 1-12 of 100</span>
                <span className="text-[12px] text-[var(--text-body)]">Pagination</span>
            </div>
        </>
    )
}
