import { useEffect, useRef } from "react";
import { cn } from "@lib/cn";

/**
 * Dialog props type
 */
type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Dialog component.
 */
export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /**
   * Side effect to handle the escape key
   */
  useEffect(() => {
    /**
     * Function to handle the escape key
     * @param {KeyboardEvent} e The keyboard event
     * @returns {void}
     */
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  /**
   * Side effect to trap focus inside the dialog
   */
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  /**
   * Side effect to prevent body scroll when the dialog is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={cn(
          "relative bg-white rounded-xl shadow-xl",
          "w-full max-w-md mx-4 p-6",
          "animate-in fade-in zoom-in-95 duration-200",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="dialog-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
