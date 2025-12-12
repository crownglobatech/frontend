import { Input } from "@/components/ui/input"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaMagnifyingGlass } from "react-icons/fa6"
export default function UserTable() {
    const data = [
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Success',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Pending',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Success',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Failed',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Success',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Pending',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Success',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Failed',
            joinedDate: '2023-01-15',
        }
        ,
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Success',
            joinedDate: '2023-01-15',
        },
        {
            activity: 'Alex Johnson',
            email: 'alexample@gmail.com',
            phoneNo: '(555) 123-4567',
            status: 'Failed',
            joinedDate: '2023-01-15',
        }
    ]
    return (
        <>
            <div className='bg-white p-4 rounded-sm'>
                {/* search */}
                <div className="flex justify-between items-center gap-8">
                    <div className="relative w-full">
                        <Input className="bg-white rounded-sm text-[#8C8C8C] placeholder:text-[#8C8C8C] placeholder:text-[12px] text-[12px]" placeholder="Search by name, email...">

                        </Input>
                        <FaMagnifyingGlass className="absolute right-2 top-2" color="#BFBFBF" />
                    </div>
                    <Select>
                        <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">Select All</SelectTrigger>
                    </Select>
                </div>

                <Table className='max-h-20 overflow-y-scroll scrollbar-hide mt-4'>
                    <TableHeader className="bg-[var(--foundation-neutral-6)]">
                        <TableRow className='bg-[var(--foundation-neutral-4)]'>
                            <TableHead className='w-[20%] font-semibold text-[var(--heading-color)]'>
                                Name
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Email
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Phone Number
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Status
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Joined Date
                            </TableHead>
                            <TableHead className='w-[15%] font-semibold text-[var(--heading-color)]'>
                                Actions
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
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.activity}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.email}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.phoneNo}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${data.status === 'Pending'
                                                ? 'bg-[#FFF4D3] text-[var(--brand-accent-color)]'
                                                : data.status === 'Success'
                                                    ? 'bg-[#C8FFD5] text-[var(--success-color)]'
                                                    : 'bg-[#FFD3D3] text-[#E63946]'
                                                }`}
                                        >
                                            {data.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>{data.joinedDate}</TableCell>
                                    <TableCell className='text-[var(--heading-color)] text-[12px]'>...</TableCell>

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
