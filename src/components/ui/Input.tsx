import { useId, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[#333333]">
        {label}
      </label>
      <input
        id={inputId}
        className={`border rounded px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#999999] outline-none transition-colors duration-150 focus:border-[#0057D8] focus:ring-2 focus:ring-[#0057D8]/15 ${
          error ? 'border-red-400' : 'border-[#E5E5E5]'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
