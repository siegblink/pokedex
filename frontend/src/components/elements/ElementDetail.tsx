import { useState } from "react";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Dialog } from "@components/ui/Dialog";
import { ElementForm } from "@components/elements/ElementForm";
import { useAppContext } from "@context/AppContext";
import { formatDate } from "@utils/formatters";
import type { Element, ElementFormData, Pokemon } from "@appTypes/index";

/**
 * Element detail props
 */
type ElementDetailProps = {
  element: Element;
  pokemon: Pokemon[];
  onUpdate: (id: number, data: ElementFormData) => Promise<Element>;
  onDelete: (id: number) => Promise<void>;
};

/**
 * Element detail component
 */
export function ElementDetail({
  element,
  pokemon,
  onUpdate,
  onDelete,
}: ElementDetailProps) {
  const { isEditing, startEditing, stopEditing, clearSelection, selectItem } =
    useAppContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /**
   * Get pokemon that have this element
   */
  const relatedPokemon = pokemon.filter((p) => p.element_id === element.id);

  /**
   * Update the element
   */
  async function updateElement(data: ElementFormData) {
    const updated = await onUpdate(element.id, data);
    selectItem({ type: "element", item: updated });
    stopEditing();
  }

  /**
   * Delete the element
   */
  async function deleteElement() {
    try {
      setDeleting(true);
      await onDelete(element.id);
      setShowDeleteDialog(false);
      clearSelection();
    } catch {
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <ElementForm
        element={element}
        onSubmit={updateElement}
        onCancel={stopEditing}
      />
    );
  }

  return (
    <>
      <Card variant="detail">
        {/* Header with color */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl shadow-lg flex-shrink-0"
            style={{ backgroundColor: element.color }}
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{element.name}</h2>
            <p className="text-gray-500 font-mono text-sm">{element.color}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="text-gray-500">Created</span>
            <p className="font-medium text-gray-900">
              {formatDate(element.created_at)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Updated</span>
            <p className="font-medium text-gray-900">
              {formatDate(element.updated_at)}
            </p>
          </div>
        </div>

        {/* Related Pokemon */}
        {relatedPokemon.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Pokemon with this type ({relatedPokemon.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedPokemon.map((p) => (
                <span
                  key={p.id}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button onClick={startEditing}>Edit</Button>
          <Button variant="danger" onClick={() => setShowDeleteDialog(true)}>
            Delete
          </Button>
        </div>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Element"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{element.name}</strong>?
          {relatedPokemon.length > 0 && (
            <span className="block mt-2 text-amber-600">
              Warning: {relatedPokemon.length} Pokemon use this element type.
            </span>
          )}
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteElement} loading={deleting}>
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
}

/**
 * Element detail empty component
 */
export function ElementDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <svg
        className="w-16 h-16 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
      <p className="text-lg font-medium">Select an element</p>
      <p className="text-sm">Click on an element to view details</p>
    </div>
  );
}
