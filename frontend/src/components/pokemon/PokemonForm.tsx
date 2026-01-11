import { useState } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Select } from "@components/ui/Select";
import { Card } from "@components/ui/Card";
import { AbilityFieldGroup } from "@components/pokemon/AbilityFieldGroup";
import type {
  Pokemon,
  Element,
  Ability,
  PokemonFormData,
  AbilityFormData,
  AbilityEditData,
} from "@appTypes/index";

/**
 * Ability update payload
 */
type AbilityUpdate = {
  id: number;
  data: AbilityFormData;
};

/**
 * Pokemon form props
 */
type PokemonFormProps = {
  pokemon: Pokemon;
  elements: Element[];
  abilities: Ability[];
  onSubmit: (data: PokemonFormData) => Promise<void>;
  onAbilitiesUpdate: (updates: AbilityUpdate[]) => Promise<void>;
  onCancel: () => void;
};

/**
 * Pokemon form component
 */
export function PokemonForm({
  pokemon,
  elements,
  abilities,
  onSubmit,
  onAbilitiesUpdate,
  onCancel,
}: PokemonFormProps) {
  const [formData, setFormData] = useState<PokemonFormData>({
    name: pokemon.name,
    image_url: pokemon.image_url,
    hp: pokemon.hp,
    element_id: pokemon.element_id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Ability editing state
   */
  const [abilityData, setAbilityData] = useState<AbilityEditData[]>(
    abilities.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      power: a.power,
    })),
  );

  /**
   * Modified ability IDs
   */
  const [modifiedAbilityIds, setModifiedAbilityIds] = useState<Set<number>>(
    new Set(),
  );

  /**
   * Change ability field values
   */
  function changeAbility(
    index: number,
    field: keyof Omit<AbilityEditData, "id">,
    value: string | number,
  ) {
    setAbilityData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Track that this ability was modified
    setModifiedAbilityIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(abilityData[index].id);
      return newSet;
    });
  }

  /**
   * Submit data to the API
   */
  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // 1. Save Pokemon data first
      await onSubmit(formData);

      // 2. Save modified abilities
      if (modifiedAbilityIds.size > 0) {
        const abilityUpdates = abilityData
          .filter((a) => modifiedAbilityIds.has(a.id))
          .map((a) => ({
            id: a.id,
            data: {
              name: a.name,
              description: a.description,
              power: a.power,
              pokemon_id: pokemon.id,
            } as AbilityFormData,
          }));

        await onAbilitiesUpdate(abilityUpdates);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  const elementOptions = elements.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  return (
    <Card
      variant="detail"
      className="max-h-[calc(100vh-7rem)] p-0! overflow-hidden flex flex-col"
    >
      <form
        onSubmit={submitForm}
        className="space-y-4 p-6 flex-1 min-h-0 overflow-y-auto"
      >
        <h2 className="text-xl font-bold text-gray-900">Edit Pokemon</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Image URL"
          name="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
          placeholder="https://..."
          required
        />

        <Input
          label="HP"
          name="hp"
          type="number"
          value={formData.hp}
          onChange={(e) =>
            setFormData({ ...formData, hp: parseInt(e.target.value) || 0 })
          }
          min={1}
          max={999}
          required
        />

        <Select
          label="Element"
          name="element_id"
          value={formData.element_id}
          onChange={(e) =>
            setFormData({ ...formData, element_id: parseInt(e.target.value) })
          }
          options={elementOptions}
          required
        />

        {abilityData.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 pt-2">
              Abilities ({abilityData.length})
            </h3>
            <div className="space-y-3">
              {abilityData.map((ability, index) => (
                <AbilityFieldGroup
                  key={ability.id}
                  ability={ability}
                  index={index}
                  onChange={changeAbility}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
