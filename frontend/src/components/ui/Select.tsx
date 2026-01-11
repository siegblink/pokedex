import { cn } from "@lib/cn";

/**
 * Select option type
 */
type SelectOption = {
  value: string | number;
  label: string;
};

/**
 * Select props type
 */
type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

/**
 * Select component
 */
export function Select({
  label,
  options,
  error,
  placeholder,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={selectId}
        className={cn(
          "block w-full rounded-lg border border-gray-300 px-3 py-2",
          "text-gray-900 bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "transition-colors duration-150",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
