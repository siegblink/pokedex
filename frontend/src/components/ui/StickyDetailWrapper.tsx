import { useStickyElement } from "@hooks/useStickyElement";
import { cn } from "@lib/cn";

/**
 * Sticky detail wrapper props
 */
type StickyDetailWrapperProps = {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
};

const NAVBAR_HEIGHT = 64; // 4rem in pixels
const PADDING = 24; // p-6 in pixels

/**
 * Wrapper component that makes its children sticky after scrolling past threshold.
 * Used to keep the detail view visible while browsing items in the list.
 */
export function StickyDetailWrapper({
  children,
  threshold = 167,
  className,
}: StickyDetailWrapperProps) {
  const { isSticky, stickyStyles, containerRef, placeholderHeight } =
    useStickyElement({
      threshold,
      topOffset: NAVBAR_HEIGHT + PADDING,
    });

  return (
    <>
      {/* Placeholder to maintain layout when sticky */}
      {isSticky && <div style={{ height: placeholderHeight }} aria-hidden />}

      <div
        ref={containerRef}
        className={cn(
          "transition-shadow duration-200",
          isSticky && "shadow-lg",
          className,
        )}
        style={stickyStyles}
      >
        {children}
      </div>
    </>
  );
}
