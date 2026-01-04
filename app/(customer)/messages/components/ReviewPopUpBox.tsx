import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateReview from "../../dashboard/components/CreateReview";
interface ReviewPopUpBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function ReviewPopUpBox({
  open,
  onOpenChange,
}: ReviewPopUpBoxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="w-[400p] [&>hidden]">
        <DialogTitle>Hey there!</DialogTitle>
        <form>
          <label htmlFor="review">Kindly rate this vendor</label>
          {/* <CreateReview /> */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
