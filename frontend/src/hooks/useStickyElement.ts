import { useState, useEffect, useRef, type RefObject } from "react";

/**
 * Use sticky element options
 */
type UseStickyElementOptions = {
  threshold: number;
  topOffset: number;
};

/**
 * Use sticky element return
 */
type UseStickyElementReturn = {
  isSticky: boolean;
  stickyStyles: React.CSSProperties;
  containerRef: RefObject<HTMLDivElement | null>;
  placeholderHeight: number;
};

/**
 * Custom hook to manage sticky element behavior based on scroll position
 *
 * @param threshold Scroll distance (px) before element becomes sticky
 * @param topOffset Distance from top of viewport when sticky (px)
 */
export function useStickyElement({
  threshold,
  topOffset,
}: UseStickyElementOptions): UseStickyElementReturn {
  const [isSticky, setIsSticky] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
  });

  /**
   * Reference to the container element
   */
  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Side effect to update the dimensions of the element.
   */
  useEffect(() => {
    let ticking = false;

    /**
     * Update the dimensions of the element
     */
    function updateDimensions() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left + window.scrollX,
        });
      }
    }

    /**
     * Handle the scroll event
     */
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeSticky = window.scrollY >= threshold;

          if (shouldBeSticky !== isSticky) {
            if (!shouldBeSticky && containerRef.current) {
              updateDimensions();
            }
            setIsSticky(shouldBeSticky);
          }

          ticking = false;
        });

        ticking = true;
      }
    }

    /**
     * Handle the resize event
     */
    function handleResize() {
      if (!isSticky) {
        updateDimensions();
      } else {
        // When sticky, temporarily unset to measure true position
        setIsSticky(false);

        // Update the dimensions of the element
        window.requestAnimationFrame(() => {
          updateDimensions();
          if (window.scrollY >= threshold) {
            setIsSticky(true);
          }
        });
      }
    }

    /**
     * Initial setup
     */
    updateDimensions();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [threshold, isSticky]);

  const stickyStyles: React.CSSProperties = isSticky
    ? {
        position: "fixed",
        top: topOffset,
        left: dimensions.left,
        width: dimensions.width,
        zIndex: 30,
      }
    : {};

  return {
    isSticky,
    stickyStyles,
    containerRef,
    placeholderHeight: isSticky ? dimensions.height : 0,
  };
}
