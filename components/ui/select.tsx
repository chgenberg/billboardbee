import React from 'react';
import { cn } from '@/lib/utils';

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, children, ...restProps } = props;
  const ref = React.useRef<HTMLSelectElement>(null);

  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-white text-[#222] px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...restProps}
    >
      {children}
    </select>
  );
}

Select.displayName = 'Select'; 