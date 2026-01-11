import { Input } from "@components/ui/Input";
import type { AbilityEditData } from "@appTypes/index";

/**
 * Ability field group props
 */
type AbilityFieldGroupProps = {
  ability: AbilityEditData;
  index: number;
  onChange: (
    index: number,
    field: keyof Omit<AbilityEditData, "id">,
    value: string | number,
  ) => void;
};

/**
 * Ability field group component
 */
export function AbilityFieldGroup({
  ability,
  index,
  onChange,
}: AbilityFieldGroupProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
      <Input
        label="Ability Name"
        name={`ability-${index}-name`}
        value={ability.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        required
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name={`ability-${index}-description`}
          value={ability.description}
          onChange={(e) => onChange(index, "description", e.target.value)}
          required
          rows={2}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
        />
      </div>

      <Input
        label="Power"
        name={`ability-${index}-power`}
        type="number"
        value={ability.power}
        onChange={(e) =>
          onChange(index, "power", parseInt(e.target.value) || 0)
        }
        min={1}
        max={100}
        required
      />
    </div>
  );
}
