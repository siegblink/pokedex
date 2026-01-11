import { ElementCard } from "@components/elements/ElementCard";
import { useAppContext } from "@context/AppContext";
import type { Element } from "@appTypes/index";

/**
 * Element list props
 */
type ElementListProps = {
  elements: Element[];
  loading: boolean;
  error: string | null;
};

/**
 * Element list component
 */
export function ElementList({ elements, loading, error }: ElementListProps) {
  const { selectedItem, selectItem } = useAppContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (elements.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">No elements found.</div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Elements ({elements.length})
      </h2>
      {elements.map((element) => (
        <ElementCard
          key={element.id}
          element={element}
          selected={
            selectedItem?.type === "element" &&
            selectedItem.item.id === element.id
          }
          onClick={() => selectItem({ type: "element", item: element })}
        />
      ))}
    </div>
  );
}
