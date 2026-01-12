import { cn } from "@lib/cn";
import type { ActiveView } from "@appTypes/index";

/**
 * Search input props
 */
type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  activeView: ActiveView;
  className?: string;
};

/**
 * Placeholders for each active view
 */
const placeholders: Record<ActiveView, string> = {
  pokemon: "Search Pokemon...",
  elements: "Search Elements...",
  abilities: "Search Abilities...",
};

/**
 * Search input with icon and clear button.
 * Placeholder adapts based on active view.
 */
export function SearchInput({
  value,
  onChange,
  activeView,
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[activeView]}
        className={cn(
          "w-full pl-10 pr-8 py-2 text-sm",
          "bg-gray-50 border border-gray-200 rounded-lg",
          "placeholder-gray-400 text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white",
          "transition-colors duration-150",
        )}
        aria-label={`Search ${activeView}`}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
