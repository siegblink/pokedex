import { cn } from "@lib/cn";

/**
 * Input props type
 */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

/**
 * Input component
 */
export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={cn(
          "block w-full rounded-lg border border-gray-300 px-3 py-2",
          "text-gray-900 placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "transition-colors duration-150",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
