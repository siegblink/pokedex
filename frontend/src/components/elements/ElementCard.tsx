import { Card } from "@components/ui/Card";
import type { Element } from "@appTypes/index";

/**
 * Element card props
 */
type ElementCardProps = {
  element: Element;
  selected: boolean;
  onClick: () => void;
};

/**
 * Element card component
 */
export function ElementCard({ element, selected, onClick }: ElementCardProps) {
  return (
    <Card variant="list" selected={selected} onClick={onClick}>
      <div className="flex items-center gap-3">
        {/* Color swatch */}
        <div
          className="w-10 h-10 rounded-lg shadow-inner flex-shrink-0"
          style={{ backgroundColor: element.color }}
        />

        {/* Element info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {element.name}
          </h3>
          <p className="text-sm text-gray-500">{element.color}</p>
        </div>
      </div>
    </Card>
  );
}
