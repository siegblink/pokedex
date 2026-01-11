import { useState } from "react";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Dialog } from "@components/ui/Dialog";
import { AbilityForm } from "@components/abilities/AbilityForm";
import { useAppContext } from "@context/AppContext";
import {
  formatDate,
  getPowerLabel,
  getPowerColorClass,
} from "@utils/formatters";
import type { Ability, Pokemon, AbilityFormData } from "@appTypes/index";

/**
 * Ability detail props
 */
type AbilityDetailProps = {
  ability: Ability;
  pokemon: Pokemon[];
  onUpdate: (id: number, data: AbilityFormData) => Promise<Ability>;
  onDelete: (id: number) => Promise<void>;
};

/**
 * Ability detail component
 */
export function AbilityDetail({
  ability,
  pokemon,
  onUpdate,
  onDelete,
}: AbilityDetailProps) {
  const { isEditing, startEditing, stopEditing, clearSelection, selectItem } =
    useAppContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /**
   * Get pokemon for this ability
   */
  const parentPokemon = pokemon.find((p) => p.id === ability.pokemon_id);

  /**
   * Update the ability
   */
  async function updateAbility(data: AbilityFormData) {
    const updated = await onUpdate(ability.id, data);
    selectItem({ type: "ability", item: updated });
    stopEditing();
  }

  /**
   * Delete the ability
   */
  async function deleteAbility() {
    try {
      setDeleting(true);
      await onDelete(ability.id);
      setShowDeleteDialog(false);
      clearSelection();
    } catch {
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <AbilityForm
        ability={ability}
        pokemon={pokemon}
        onSubmit={updateAbility}
        onCancel={stopEditing}
      />
    );
  }

  return (
    <>
      <Card variant="detail">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{ability.name}</h2>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`text-xl font-bold ${getPowerColorClass(ability.power)}`}
            >
              Power: {ability.power}
            </span>
            <span className="text-gray-500">
              ({getPowerLabel(ability.power)})
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{ability.description}</p>
        </div>

        {/* Parent Pokemon */}
        {parentPokemon && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Belongs to
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white overflow-hidden">
                <img
                  src={parentPokemon.image_url}
                  alt={parentPokemon.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {parentPokemon.name}
                </p>
                <p className="text-sm text-gray-500">HP: {parentPokemon.hp}</p>
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="text-gray-500">Created</span>
            <p className="font-medium text-gray-900">
              {formatDate(ability.created_at)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Updated</span>
            <p className="font-medium text-gray-900">
              {formatDate(ability.updated_at)}
            </p>
          </div>
        </div>

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
        title="Delete Ability"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the ability{" "}
          <strong>{ability.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAbility} loading={deleting}>
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
}

/**
 * Ability detail empty component
 */
export function AbilityDetailEmpty() {
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <p className="text-lg font-medium">Select an ability</p>
      <p className="text-sm">Click on an ability to view details</p>
    </div>
  );
}
