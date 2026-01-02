"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Pagination from "../../Pagination";
import { useEffect, useState } from "react";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { getAllUsersAdmin } from "@/lib/api/admin";
import { RowActions } from "../../RowActions";

export default function UserTable() {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        if (!token) {
          notify("User not authenticated.", "error", "Error");
          return;
        }
        setLoading(true);
        const data = await getAllUsersAdmin(token, currentPage);
        setUsers(data || []);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);
  console.log(users);

  const filteredUsers = users?.data?.filter((user: any) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phone_number?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ? true : user.verification_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="bg-white p-4 rounded-sm">
        {/* Search & Filter */}
        <div className="flex justify-between items-center gap-8">
          <div className="relative w-full">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white rounded-sm text-[#8C8C8C] placeholder:text-[#8C8C8C] placeholder:text-[12px] text-[12px]"
              placeholder="Search by name, email, phone..."
            />
            <FaMagnifyingGlass
              className="absolute right-2 top-2"
              color="#BFBFBF"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[var(--foundation-neutral-4)] text-[12px] text-[var(--text-body)]">
              {statusFilter === "all" ? "Status" : statusFilter}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table className="max-h-80 overflow-y-scroll scrollbar-hide mt-4">
          <TableHeader className="bg-[var(--foundation-neutral-6)]">
            <TableRow className="bg-[var(--foundation-neutral-4)]">
              <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
                Name
              </TableHead>
              <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
                Email
              </TableHead>
              <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
                Phone Number
              </TableHead>
              <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
                Joined Date
              </TableHead>
              <TableHead className="w-[10%] font-semibold text-[var(--heading-color)]">
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
            ) : filteredUsers?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-6 text-[var(--foundation-neutral-8)] text-center"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers?.map((user: any, index: number) => (
                <TableRow key={index} className="border-none">
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {user.phone_number}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    {user.joined_date}
                  </TableCell>
                  <TableCell className="text-[var(--heading-color)] text-[12px]">
                    <RowActions
                      onSuspend={() => console.log("")}
                      onRevive={() => console.log("")}
                    />
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
          Showing 1-{filteredUsers?.length || 0} of{" "}
          {users?.pagination?.total || 0}
        </span>
        <span className="text-[12px] text-[var(--text-body)]">
          <Pagination
            currentPage={users?.pagination?.current_page}
            lastPage={users?.pagination?.last_page}
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
