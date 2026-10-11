/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tonal' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all active:scale-[0.98] cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-[12px] py-1.5 px-3 rounded-lg gap-1.5',
    md: 'text-[14px] py-2.5 px-4 rounded-xl gap-2',
    lg: 'text-[15px] py-3.5 px-6 rounded-xl gap-2.5 shadow-sm',
  };

  const variantStyles = {
    primary: 'bg-[#874D27] text-white hover:bg-[#6E3914] shadow-sm',
    secondary: 'bg-[#EFE1D4] text-[#35251F] hover:bg-[#E5D2C2] border border-[#E8E0D6]',
    ghost: 'bg-transparent text-[#35251F] hover:bg-[#F0EEE8]',
    tonal: 'bg-[#F0EEE8] text-[#1C1C18] hover:bg-[#EBE8E2]',
    danger: 'bg-[#BA1A1A] text-white hover:bg-[#93000A]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};
