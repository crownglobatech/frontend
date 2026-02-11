type Attachment = {
    created_at: string
    file_name: string
    file_path: string
    file_size: number
    file_type: string
    id: number
    message_id: number
    updated_at: string
    url: string;
};

export default function MessageAttachment({ attachment }: { attachment: Attachment }) {

    // IMAGE
    if (attachment.file_type.startsWith("image/")) {
        return (
            <img
                src={attachment.url}
                alt={attachment.file_name}
                className="max-w-[220px] rounded-lg border mt-2 cursor-pointer hover:opacity-90"
            />
        );
    }

    // VIDEO
    if (attachment.file_type.startsWith("video/")) {
        return (
            <video controls className="max-w-[260px] rounded-lg mt-2">
                <source src={attachment.url} type={attachment.file_type} />
            </video>
        );
    }

    // DOCUMENT / OTHER FILE
    return (
        <a
            href={attachment.url}
            target="_blank"
            className="flex items-center gap-2 mt-2 p-2 border rounded-md bg-gray-50 text-black text-xs hover:bg-gray-100"
        >
            📄 {attachment.file_name}
        </a>
    );
}
