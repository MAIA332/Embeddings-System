'use client';

import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant: 'light' | 'dark' | 'disable'; 
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled,
  variant,
}) => {
  const baseStyles = 'px-4 py-2 rounded-md focus:outline-none transition duration-200';
  
  const variantStyles = {
    'light':'bg-white text-black hover:bg-gray-200',
    'dark':'bg-gray-800 text-white hover:bg-gray-600',
    'disable':'bg-gray-300 text-black'
  }

  const dinamic_style = disabled == true?variantStyles["disable"]:variantStyles[variant]
    

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${dinamic_style} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;