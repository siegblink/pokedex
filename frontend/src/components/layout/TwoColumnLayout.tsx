import { StickyDetailWrapper } from "@components/ui/StickyDetailWrapper";

/**
 * Two column layout props
 */
type TwoColumnLayoutProps = {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  stickyRightColumn?: boolean;
  stickyThreshold?: number;
};

/**
 * Two column layout component
 */
export function TwoColumnLayout({
  leftColumn,
  rightColumn,
  stickyRightColumn = false,
  stickyThreshold = 167,
}: TwoColumnLayoutProps) {
  return (
    <div className="flex justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="flex w-full max-w-6xl">
        {/* Left Column - List View */}
        <div className="flex-1 p-6 overflow-y-auto">{leftColumn}</div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-300" />

        {/* Right Column - Detail View */}
        <div className="flex-1 p-6 overflow-y-auto">
          {stickyRightColumn ? (
            <StickyDetailWrapper threshold={stickyThreshold}>
              {rightColumn}
            </StickyDetailWrapper>
          ) : (
            rightColumn
          )}
        </div>
      </div>
    </div>
  );
}
