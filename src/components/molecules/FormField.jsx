import React from 'react'
import { cn } from '@/utils/cn'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

const FormField = ({ 
  label, 
  type = 'input', 
  error, 
  className, 
  children,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id || props.name}>
          {label}
        </Label>
      )}
      {type === 'input' && <Input {...props} />}
      {type === 'select' && <Select {...props}>{children}</Select>}
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField