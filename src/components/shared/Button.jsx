export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border-2 border-vintage-gold text-vintage-gold hover:bg-vintage-gold hover:text-white',
    ghost: 'text-navy-blue hover:text-vintage-gold',
  }

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
