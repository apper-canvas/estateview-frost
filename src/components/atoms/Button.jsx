import React from 'react'
import { cn } from '@/utils/cn'

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transform hover:scale-105",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg transform hover:scale-105",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent/80 shadow-md hover:shadow-lg transform hover:scale-105",
    ghost: "text-primary hover:bg-primary/10 border border-primary/20 hover:border-primary/30",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  }
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
    xl: "h-14 px-10 text-xl",
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button