
interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'white' | 'neutral';
    className?: string;
}

export default function LoadingSpinner({
    size = 'md',
    variant = 'primary',
    className = ''
}: LoadingSpinnerProps) {

    // Size mappings
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
        xl: 'w-12 h-12 border-4'
    };

    // Color mappings
    const variantClasses = {
        primary: 'border-b-[var(--primary-color)] border-[var(--primary-color)]/30',
        white: 'border-b-white border-white/30',
        neutral: 'border-b-gray-600 border-gray-200'
    };

    return (
        <div
            className={`
        inline-block rounded-full animate-spin 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${className}
      `}
            role="status"
            aria-label="loading"
        />
    );
}
