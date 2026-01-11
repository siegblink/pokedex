import { useState } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Select } from "@components/ui/Select";
import { Card } from "@components/ui/Card";
import type { Ability, Pokemon, AbilityFormData } from "@appTypes/index";

/**
 * Ability form props
 */
type AbilityFormProps = {
  ability: Ability;
  pokemon: Pokemon[];
  onSubmit: (data: AbilityFormData) => Promise<void>;
  onCancel: () => void;
};

/**
 * Ability form component
 */
export function AbilityForm({
  ability,
  pokemon,
  onSubmit,
  onCancel,
}: AbilityFormProps) {
  const [formData, setFormData] = useState<AbilityFormData>({
    name: ability.name,
    description: ability.description,
    power: ability.power,
    pokemon_id: ability.pokemon_id,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submit the form data to the API
   */
  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  const pokemonOptions = pokemon.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Card variant="detail">
      <form onSubmit={submitForm} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Ability</h2>

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

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
          />
        </div>

        <Input
          label="Power"
          name="power"
          type="number"
          value={formData.power}
          onChange={(e) =>
            setFormData({ ...formData, power: parseInt(e.target.value) || 0 })
          }
          min={1}
          max={100}
          required
        />

        <Select
          label="Pokemon"
          name="pokemon_id"
          value={formData.pokemon_id}
          onChange={(e) =>
            setFormData({ ...formData, pokemon_id: parseInt(e.target.value) })
          }
          options={pokemonOptions}
          required
        />

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
