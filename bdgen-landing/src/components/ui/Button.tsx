import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  href: string;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  href,
  className = '',
  ...rest
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  return (
    <a href={href} className={`btn ${variantClass} ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
