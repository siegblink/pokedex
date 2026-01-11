import { cn } from "@lib/cn";

/**
 * Card props type
 */
type CardProps = {
  variant?: "list" | "detail";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

/**
 * Card component
 */
export function Card({
  variant = "list",
  selected = false,
  onClick,
  className,
  children,
}: CardProps) {
  const isClickable = variant === "list" && onClick;

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onClick) onClick();
    }
  }

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border",
        "transition-all duration-150 ease-in-out",
        variant === "list" && [
          "p-4",
          isClickable && "cursor-pointer hover:shadow-md hover:border-gray-300",
          selected && "ring-2 ring-blue-500 border-blue-500",
        ],
        variant === "detail" && "p-6",
        className,
      )}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? onKeyDown : undefined}
    >
      {children}
    </div>
  );
}
