import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <div className={`bg-white border border-[#E5E5E5] rounded p-8 ${className}`}>{children}</div>;
}
