import { useState } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Select } from "@components/ui/Select";
import { Card } from "@components/ui/Card";
import type { Pokemon, Element, PokemonFormData } from "@appTypes/index";

/**
 * Pokemon form props
 */
type PokemonFormProps = {
  pokemon: Pokemon;
  elements: Element[];
  onSubmit: (data: PokemonFormData) => Promise<void>;
  onCancel: () => void;
};

/**
 * Pokemon form component
 */
export function PokemonForm({
  pokemon,
  elements,
  onSubmit,
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
   * Submit data to the API
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

  const elementOptions = elements.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  return (
    <Card variant="detail">
      <form onSubmit={submitForm} className="space-y-4">
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
