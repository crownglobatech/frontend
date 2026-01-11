"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Pagination from "../Pagination";
import { useEffect, useState, useMemo } from "react";
import { getAllBookingsAdmin } from "@/lib/api/admin";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { useSearchParams } from "next/navigation";
import { logger } from "@/lib/logger";

export default function BookingsTable() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState(""); //  search term
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { notify } = useNotification();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        if (!token) {
          notify("User not authenticated.", "error", "Error");
          setLoading(false);
          return;
        }
        setLoading(true);
        const data = await getAllBookingsAdmin(token, currentPage);
        setBookings(data.data || []);
        setPaginatedData(data || []);
        setLoading(false);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
        setLoading(false);
      }
    };
    fetchAllBookings();
    logger.log(bookings);
  }, [currentPage]);

  //  Filter bookings based on search input
  const filteredBookings = useMemo(() => {
    if (!searchTerm) return bookings;
    const lower = searchTerm.toLowerCase();
    return bookings.filter(
      (b: any) =>
        (b.booking_id || "").toString().toLowerCase().includes(lower) ||
        (b.customer || "").toLowerCase().includes(lower) ||
        (b.vendor || "").toLowerCase().includes(lower) ||
        (b.service || "").toLowerCase().includes(lower)
    );
  }, [bookings, searchTerm, currentPage]);
  logger.log(paginatedData);

  return (
    <>
      <div className="bg-white p-4 rounded-sm">
        {/* Search */}
        <div className="flex justify-between items-center gap-8">
          <div className="relative w-full">
            <Input
              value={searchTerm} //  bind value
              onChange={(e) => setSearchTerm(e.target.value)} //  update state
              className="bg-white rounded-sm text-[#8C8C8C] placeholder:text-[#8C8C8C] placeholder:text-[12px] text-[12px]"
              placeholder="Search by booking ID, name, vendor, service..."
            />
            <FaMagnifyingGlass
              className="absolute right-2 top-2"
              color="#BFBFBF"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">
                Service
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">
                Status
              </SelectTrigger>
            </Select>
          </div>
        </div>

        <Table className="max-h-20 overflow-y-scroll scrollbar-hide mt-4">
          <TableHeader className="bg-[var(--foundation-neutral-6)]">
            <TableRow className="bg-[var(--foundation-neutral-4)]">
              <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
                Booking-ID
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Customer
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Vendor
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Service
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Status
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Amount
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Skeleton rows
              [...Array(5)].map((_, i) => (
                <TableRow key={i} className="border-none">
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="w-full h-4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-6 text-[var(--foundation-neutral-8)] text-center"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((data: any, index: number) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.booking_id}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.customer}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.vendor}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.service}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${data.status === "In progress"
                        ? "bg-[#D4E6FF] text-[var(--primary-color)]"
                        : data.status === "Closed" ||
                          data.status === "Confirmed"
                          ? "bg-[#C8FFD5] text-[var(--success-color)]"
                          : data.status === "Cancelled"
                            ? "bg-[#FFD3D3] text-[#E63946]"
                            : "bg-[#FFD3D3] text-[#E63946]"
                        }`}
                    >
                      {data.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.amount}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {data.date}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-[12px] text-[var(--text-body)]">
          Showing 1-{filteredBookings.length} of{" "}
          {paginatedData.pagination?.total}{" "}
        </span>
        <span className="text-[12px] text-[var(--text-body)]">
          <Pagination
            currentPage={paginatedData?.pagination?.current_page}
            lastPage={paginatedData?.pagination?.last_page}
            onPageChange={(page) => {
              logger.log(currentPage);
              if (page === currentPage) return;
              setCurrentPage(page);
            }}
          />
        </span>
      </div>
    </>
  );
}
