import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Props {
  recentActivities: any[];
}
export default function ActivityTable({ recentActivities }: Props) {
  //   const data = [
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Success",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Pending",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Success",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Failed",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Success",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Pending",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Success",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Failed",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Success",
  //     },
  //     {
  //       activity: "New User Signup",
  //       user: "Alex Morgan",
  //       timestamp: "2 minutes ago",
  //       status: "Failed",
  //     },
  //   ];
  return (
    <Table className="max-h-20 overflow-y-scroll scrollbar-hide">
      <TableHeader className="bg-[var(--foundation-neutral-6)]">
        <TableRow className="bg-[var(--foundation-neutral-4)]">
          <TableHead className="w-[20%] font-semibold text-[var(--heading-color)]">
            Activity
          </TableHead>
          <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
            User/Vendor
          </TableHead>
          <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
            Timestamp
          </TableHead>
          <TableHead className="w-[15%] font-semibold text-[var(--heading-color)]">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!recentActivities ? (
          <TableRow>
            <TableCell
              colSpan={14}
              className="py-6 text-[var(--foundation-neutral-8)] text-center"
            >
              No performance data available yet
            </TableCell>
          </TableRow>
        ) : (
          recentActivities.map((data, index) => (
            <TableRow key={index} className="border-none">
              <TableCell className="text-[var(--heading-color)] text-[12px]">
                {data.activity}
              </TableCell>
              <TableCell className="text-[var(--heading-color)] text-[12px]">
                {data.user_name}
              </TableCell>
              <TableCell className="text-[var(--heading-color)] text-[12px]">
                {data.timestamp}
              </TableCell>
              <TableCell>
                <span
                  className={`px-4 capitalize py-1 rounded-full text-[12px] font-semibold ${
                    data.status === "pending"
                      ? "bg-[#FFF4D3] text-[var(--brand-accent-color)]"
                      : data.status === "success"
                      ? "bg-[#C8FFD5] text-[var(--success-color)]"
                      : data.status === "ongoing"
                      ? "bg-[#C8FFD5]/70 text-[var(--success-color)]/70"
                      : "bg-[#FFD3D3] text-[#E63946]"
                  }`}
                >
                  {data.status}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
