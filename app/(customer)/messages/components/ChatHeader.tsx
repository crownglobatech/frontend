// ChatHeader.tsx

export default function ChatHeader() {
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b">
      <div className="flex items-center">
        <img src="/user.png" alt="user" className="mr-3 rounded-full w-10 h-10" />
        <div>
          <div className="font-semibold text-black text-base">Jane Cooper</div>
          <div className="text-[var(--success-color)] text-sm">Online</div>
        </div>
      </div>
      <div>
       <button className="bg-transparent px-4 py-2 rounded-md font-semibold text-[var(--danger-color)] text-sm">
        Reject Booking
      </button>
      <button className="bg-[var(--success-color)] px-4 py-2 rounded-md font-semibold text-white text-sm">
        Accept Booking
      </button>
      </div>
    </div>
  );
}