import { AbilityCard } from "@components/abilities/AbilityCard";
import { useAppContext } from "@context/AppContext";
import type { Ability, Pokemon } from "@appTypes/index";

/**
 * Ability list props
 */
type AbilityListProps = {
  abilities: Ability[];
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
};

/**
 * Ability list component
 */
export function AbilityList({
  abilities,
  pokemon,
  loading,
  error,
}: AbilityListProps) {
  const { selectedItem, selectItem } = useAppContext();

  /**
   * Create a map for quick pokemon lookup
   */
  const pokemonMap = new Map(pokemon.map((p) => [p.id, p]));

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

  if (abilities.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">No abilities found.</div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Abilities ({abilities.length})
      </h2>
      {abilities.map((ability) => (
        <AbilityCard
          key={ability.id}
          ability={ability}
          pokemon={pokemonMap.get(ability.pokemon_id)}
          selected={
            selectedItem?.type === "ability" &&
            selectedItem.item.id === ability.id
          }
          onClick={() => selectItem({ type: "ability", item: ability })}
        />
      ))}
    </div>
  );
}
