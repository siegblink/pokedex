import { Card } from "@components/ui/Card";
import type { Pokemon, Element } from "@appTypes/index";

/**
 * Pokemon card props
 */
type PokemonCardProps = {
  pokemon: Pokemon;
  element: Element | undefined;
  selected: boolean;
  onClick: () => void;
};

/**
 * Pokemon card component
 */
export function PokemonCard({
  pokemon,
  element,
  selected,
  onClick,
}: PokemonCardProps) {
  return (
    <Card variant="list" selected={selected} onClick={onClick}>
      <div className="flex items-center gap-4">
        {/* Pokemon image */}
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
          <img
            src={pokemon.image_url}
            alt={pokemon.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Pokemon info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {pokemon.name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            {/* HP */}
            <span className="text-sm text-gray-500">
              HP:{" "}
              <span className="font-medium text-gray-700">{pokemon.hp}</span>
            </span>
            {/* Element badge */}
            {element && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: element.color }}
              >
                {element.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
