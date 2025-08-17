import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:opacity-90 focus-visible:ring-primary-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-secondary text-white hover:opacity-90 focus-visible:ring-secondary-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-primary-500',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500'
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-12 px-8 text-lg',
    xl: 'h-14 px-10 text-xl'
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;