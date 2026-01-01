"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdMoreVert } from "react-icons/md";

type RowActionsProps = {
  onActivate?: () => void;
  onDeActivate?: () => void;
  onSuspend?: () => void;
  onRevive?: () => void;
};

export function RowActions({
  onActivate,
  onDeActivate,
  onSuspend,
  onRevive,
}: RowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded hover:bg-muted focus:outline-none">
          <MdMoreVert size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 ">
        {onActivate && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-[var(--primary-color)] transition-all duration-300 cursor-pointer data-[highlighted]:text-white"
            onClick={onActivate}
          >
            Activate
          </DropdownMenuItem>
        )}

        {onDeActivate && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-[var(--primary-color)] transition-all duration-300 cursor-pointer data-[highlighted]:text-white"
            onClick={onDeActivate}
          >
            Deactivate
          </DropdownMenuItem>
        )}
        {onSuspend && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-[var(--primary-color)] transition-all duration-300 cursor-pointer data-[highlighted]:text-white"
            onClick={onSuspend}
          >
            Suspend
          </DropdownMenuItem>
        )}
        {onRevive && (
          <DropdownMenuItem
            className="data-[highlighted]:bg-[var(--primary-color)] transition-all duration-300 cursor-pointer data-[highlighted]:text-white"
            onClick={onRevive}
          >
            Revive
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
