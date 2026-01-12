import { cn } from "@lib/cn";
import { SearchInput } from "@components/ui/SearchInput";
import type { ActiveView } from "@appTypes/index";

/**
 * Navbar props
 */
type NavbarProps = {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

/**
 * Navbar items
 */
const navItems: { view: ActiveView; label: string }[] = [
  { view: "pokemon", label: "Pokemon" },
  { view: "elements", label: "Elements" },
  { view: "abilities", label: "Abilities" },
];

/**
 * Navbar component
 */
export function Navbar({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* App name + Search */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <line
                    x1="2"
                    y1="12"
                    x2="22"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Pokedex</h1>
            </div>

            {/* Search Input */}
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              activeView={activeView}
              className="w-64"
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-1">
            {navItems.map(({ view, label }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeView === view
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
