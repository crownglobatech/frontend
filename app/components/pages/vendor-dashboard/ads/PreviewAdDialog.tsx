import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PreviewAdDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: {
        title: string;
        description: string;
        street: string;
        area: string;
        lga: string;
        state: string;
        country: string;
        listing_type: string;
        size: string;
        bedrooms: string;
        bathrooms: string;
        price: string;
        photos: File[];
        email: string;
        phone_e164: string;
        phone_country_iso: string;
    };
}

export default function PreviewAdDialog({
    open,
    onOpenChange,
    data,
}: PreviewAdDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] p-0 z-[1000] overflow-y-auto duration-500 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <DialogHeader className="p-6 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[var(--foundation-neutral-6)]">
                    <DialogTitle className="text-xl font-bold text-[var(--heading-color)]">
                        Ad Preview
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6 p-6">
                    {/* Images */}
                    {data.photos.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {data.photos.map((file, index) => (
                                <div key={index} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 text-gray-500 text-center rounded-md italic">
                            No photos selected
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-lg">{data.title || "Untitled Ad"}</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">
                            {data.description || "No description provided."}
                        </p>
                        <p className="text-xl font-semibold text-[var(--primary-color)]">
                            {data.price ? `₦${Number(data.price).toLocaleString()}` : "Price Not Set"}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        {/* Property Details */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 border-b pb-2">Property Details</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-gray-500">Type:</span>
                                <span className="font-medium">{data.listing_type || "-"}</span>

                                <span className="text-gray-500">Size:</span>
                                <span className="font-medium">{data.size ? `${data.size} sqm` : "-"}</span>

                                <span className="text-gray-500">Bedrooms:</span>
                                <span className="font-medium">{data.bedrooms || "-"}</span>

                                <span className="text-gray-500">Bathrooms:</span>
                                <span className="font-medium">{data.bathrooms || "-"}</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 border-b pb-2">Location</h4>
                            <div className="space-y-1">
                                <p>{data.street || "Street not set"}</p>
                                <p>
                                    {[data.area, data.lga, data.state, data.country]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-2 pt-2 border-t">
                        <h4 className="font-semibold text-gray-900">Contact Info</h4>
                        <div className="flex gap-6 text-sm">
                            <div>
                                <span className="text-gray-500 mr-2">Email:</span>
                                <span className="font-medium">{data.email || "-"}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 mr-2">Phone:</span>
                                <span className="font-medium">{data.phone_e164 || "-"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
