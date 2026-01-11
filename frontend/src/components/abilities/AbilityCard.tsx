import { Card } from "@components/ui/Card";
import { getPowerLabel, getPowerColorClass } from "@utils/formatters";
import type { Ability, Pokemon } from "@appTypes/index";

/**
 * Ability card props
 */
type AbilityCardProps = {
  ability: Ability;
  pokemon: Pokemon | undefined;
  selected: boolean;
  onClick: () => void;
};

/**
 * Ability card component
 */
export function AbilityCard({
  ability,
  pokemon,
  selected,
  onClick,
}: AbilityCardProps) {
  return (
    <Card variant="list" selected={selected} onClick={onClick}>
      <div className="flex items-start justify-between gap-3">
        {/* Ability info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {ability.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
            {ability.description}
          </p>
          {pokemon && (
            <p className="text-xs text-gray-400 mt-1.5">
              Belongs to {pokemon.name}
            </p>
          )}
        </div>

        {/* Power indicator */}
        <div className="flex flex-col items-end flex-shrink-0">
          <span
            className={`text-lg font-bold ${getPowerColorClass(ability.power)}`}
          >
            {ability.power}
          </span>
          <span className="text-xs text-gray-500">
            {getPowerLabel(ability.power)}
          </span>
        </div>
      </div>
    </Card>
  );
}
