import { useState } from "react";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Card } from "@components/ui/Card";
import type { Element, ElementFormData } from "@appTypes/index";

/**
 * Element form props
 */
type ElementFormProps = {
  element: Element;
  onSubmit: (data: ElementFormData) => Promise<void>;
  onCancel: () => void;
};

/**
 * Element form component
 */
export function ElementForm({ element, onSubmit, onCancel }: ElementFormProps) {
  const [formData, setFormData] = useState<ElementFormData>({
    name: element.name,
    color: element.color,
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

  return (
    <Card variant="detail">
      <form onSubmit={submitForm} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Element</h2>

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
            Color <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
            <Input
              label=""
              name="colorHex"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

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
