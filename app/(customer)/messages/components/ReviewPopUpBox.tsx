import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
      <DialogContent>hey there</DialogContent>
    </Dialog>
  );
}
