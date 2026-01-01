"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { MdMoreVert } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { StarIcon } from "lucide-react";
import Pagination from "../../Pagination";
import { useEffect, useState } from "react";
import { getAllVendorsAdmin } from "@/lib/api/admin";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { RowActions } from "../../RowActions";

export default function VendorTable() {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        if (!token) {
          notify("User not authenticated.", "error", "Error");
          setLoading(false);
          return;
        }
        setLoading(true);
        const data = await getAllVendorsAdmin(token, currentPage);
        setVendors(data || []);
        setLoading(false);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
        setLoading(false);
      }
    };
    fetchAllVendors();
  }, []);

  // Filtered vendors based on search, service, and status
  const filteredVendors = vendors?.data?.filter((vendor: any) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      vendor.business_name?.toLowerCase().includes(term) ||
      vendor.category?.toLowerCase().includes(term);
    const matchesService = serviceFilter
      ? vendor.category === serviceFilter
      : true;
    const matchesStatus = statusFilter
      ? vendor.verification_status === statusFilter
      : true;
    return matchesSearch && matchesService && matchesStatus;
  });

  return (
    <>
      <div className="bg-white p-4 rounded-sm">
        {/* Search & Filters */}
        <div className="flex justify-between items-center gap-8">
          <div className="relative w-full">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white rounded-sm text-[#8C8C8C] placeholder:text-[#8C8C8C] placeholder:text-[12px] text-[12px]"
              placeholder="Search by name, category..."
            />
            <FaMagnifyingGlass
              className="absolute right-2 top-2"
              color="#BFBFBF"
            />
          </div>

          <div className="flex gap-2 ">
            {/* Service Filter */}
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">
                {serviceFilter || "Service"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_empty_">All</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                {/* Add more service items as needed */}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">
                {statusFilter || "Status"}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_empty_">All</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Table className="max-h-80 overflow-y-scroll scrollbar-hide mt-4">
          <TableHeader className="bg-[var(--foundation-neutral-6)]">
            <TableRow className="bg-[var(--foundation-neutral-4)]">
              <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
                Business Name
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Category
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Ads
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Verification Status
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Rating
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-6 text-[var(--foundation-neutral-8)] text-center"
                >
                  Please wait...
                </TableCell>
              </TableRow>
            ) : filteredVendors?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-6 text-[var(--foundation-neutral-8)] text-center"
                >
                  No vendors found
                </TableCell>
              </TableRow>
            ) : (
              filteredVendors?.map((vendor: any, index: string) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {vendor.business_name}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {vendor.category}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {vendor.ads}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${
                        vendor.verification_status === "Pending"
                          ? "bg-[#FFF4D3] text-[var(--brand-accent-color)]"
                          : vendor.verification_status === "Verified"
                          ? "bg-[#C8FFD5] text-[var(--success-color)]"
                          : "bg-[#FFD3D3] text-[#E63946]"
                      }`}
                    >
                      {vendor.verification_status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    <span className="flex gap-1 items-center text-[10px] text-[#595959]">
                      <StarIcon color="#DDBF5F" size={10} />
                      {vendor.rating}
                    </span>
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[8px]">
                    <RowActions
                      onActivate={() => console.log("")}
                      onDeActivate={() => console.log("")}
                    />{" "}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-[12px] text-[var(--text-body)]">
          Showing 1-{vendors?.pagination?.to || 0} of{" "}
          {vendors?.pagination?.total || 0}
        </span>
        <span className="text-[12px] text-[var(--text-body)]">
          <Pagination
            currentPage={vendors?.pagination?.current_page}
            lastPage={vendors?.pagination?.last_page}
            onPageChange={(page) => {
              console.log(currentPage);
              if (page === currentPage) return;
              setCurrentPage(page);
            }}
          />
        </span>
      </div>
    </>
  );
}
