// ChatHeader.tsx

export default function ProviderChatHeader() {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 border-b">
      <div className="flex items-center">
        <img src="/user.png" alt="user" className="mr-3 rounded-full w-10 h-10" />
        <div>
          <div className="font-semibold text-black text-base">Jane Cooper</div>
          <div className="text-[var(--success-color)] text-sm">Online</div>
        </div>
      </div>
      <div>
       <button className="bg-[var(--primary-color)] px-4 py-3 rounded-md font-semibold text-white text-sm cursor-pointer">
        Custom Booking
      </button>
      </div>
    </div>
  );
}