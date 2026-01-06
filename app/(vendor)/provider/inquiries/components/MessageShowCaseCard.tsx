import Image from 'next/image';

interface MessageShowcaseCardProps {
  providerName?: string;
  lastMessageSnippet?: string;
  timestamp?: string;
  unreadCount?: number;
  isActive?: boolean;
}

export default function MessageShowcaseCard({
  providerName,
  lastMessageSnippet,
  timestamp,
  unreadCount = 0,  // default to 0
  isActive = false,
}: MessageShowcaseCardProps) {

  const hasUnread = unreadCount > 0;

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className={`flex items-center justify-between w-full transition-all duration-300 cursor-pointer py-3 px-4 ${isActive ? 'bg-[var(--foundation-neutral-4)]' : 'hover:bg-[var(--foundation-neutral-4)]'
      }`}>
      <div className='flex items-center gap-4 flex-1 min-w-0'>
        <div className='flex-shrink-0'>
          <Image
            alt='user'
            src='/user.png'
            width={48}
            height={48}
            className='rounded-full object-cover'
          />
        </div>
        <div className='flex-1 min-w-0'>
          <h2 className={`font-semibold text-[16px] truncate ${hasUnread ? 'text-black font-bold' : 'text-gray-900'
            }`}>
            {providerName || 'Unknown User'}
          </h2>
          <p className={`text-[14px] truncate ${hasUnread
              ? 'text-black font-medium'
              : 'text-[var(--text-body)]'
            }`}>
            {lastMessageSnippet || 'No messages yet'}
          </p>
        </div>
      </div>

      <div className='flex flex-col items-end gap-1 flex-shrink-0'>
        <span className='text-[12px] text-[var(--muted-text)] whitespace-nowrap'>
          {timestamp?.includes('ago') ? timestamp : formatTimestamp(timestamp)}
        </span>

        {/* ONLY SHOW BADGE IF unreadCount > 0 */}
        {hasUnread && (
          <div className='bg-[var(--primary-color)] text-white text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 shadow-sm'>
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}