import { PokemonCard } from "@components/pokemon/PokemonCard";
import { useAppContext } from "@context/AppContext";
import type { Pokemon, Element } from "@appTypes/index";

/**
 * Pokemon list props
 */
type PokemonListProps = {
  pokemon: Pokemon[];
  elements: Element[];
  loading: boolean;
  error: string | null;
};

/**
 * Pokemon list component
 */
export function PokemonList({
  pokemon,
  elements,
  loading,
  error,
}: PokemonListProps) {
  const { selectedItem, selectItem } = useAppContext();

  /**
   * Create a map for quick element lookup
   */
  const elementMap = new Map(elements.map((e) => [e.id, e]));

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

  if (pokemon.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">No Pokemon found.</div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Pokemon ({pokemon.length})
      </h2>
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          element={elementMap.get(p.element_id)}
          selected={
            selectedItem?.type === "pokemon" && selectedItem.item.id === p.id
          }
          onClick={() => selectItem({ type: "pokemon", item: p })}
        />
      ))}
    </div>
  );
}
