import { useState } from "react";
import { Card } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { Dialog } from "@components/ui/Dialog";
import { PokemonForm } from "@components/pokemon/PokemonForm";
import { useAppContext } from "@context/AppContext";
import {
  formatDate,
  getPowerLabel,
  getPowerColorClass,
} from "@utils/formatters";
import type {
  Pokemon,
  Element,
  Ability,
  PokemonFormData,
  AbilityFormData,
} from "@appTypes/index";

/**
 * Pokemon detail props
 */
type PokemonDetailProps = {
  pokemon: Pokemon;
  elements: Element[];
  abilities: Ability[];
  onUpdate: (id: number, data: PokemonFormData) => Promise<Pokemon>;
  onAbilityUpdate: (id: number, data: AbilityFormData) => Promise<Ability>;
  onDelete: (id: number) => Promise<void>;
};

/**
 * Pokemon detail component
 */
export function PokemonDetail({
  pokemon,
  elements,
  abilities,
  onUpdate,
  onAbilityUpdate,
  onDelete,
}: PokemonDetailProps) {
  const { isEditing, startEditing, stopEditing, clearSelection, selectItem } =
    useAppContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /**
   * Get element for this pokemon
   */
  const element = elements.find((e) => e.id === pokemon.element_id);

  /**
   * Get abilities for this pokemon
   */
  const pokemonAbilities = abilities.filter((a) => a.pokemon_id === pokemon.id);

  /**
   * Update the pokemon
   */
  async function updatePokemon(data: PokemonFormData) {
    const updated = await onUpdate(pokemon.id, data);
    selectItem({ type: "pokemon", item: updated });
    stopEditing();
  }

  /**
   * Update multiple abilities
   */
  async function updateAbilities(
    updates: Array<{ id: number; data: AbilityFormData }>,
  ) {
    const results = await Promise.allSettled(
      updates.map(({ id, data }) => onAbilityUpdate(id, data)),
    );

    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      throw new Error(
        `Failed to save ${failures.length} of ${updates.length} abilities`,
      );
    }
  }

  /**
   * Delete the pokemon
   */
  async function deletePokemon() {
    try {
      setDeleting(true);
      await onDelete(pokemon.id);
      setShowDeleteDialog(false);
      clearSelection();
    } catch {
      setDeleting(false);
    }
  }

  if (isEditing) {
    return (
      <PokemonForm
        pokemon={pokemon}
        elements={elements}
        abilities={pokemonAbilities}
        onSubmit={updatePokemon}
        onAbilitiesUpdate={updateAbilities}
        onCancel={stopEditing}
      />
    );
  }

  return (
    <>
      <Card variant="detail">
        {/* Header with image */}
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
            <img
              src={pokemon.image_url}
              alt={pokemon.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{pokemon.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-lg text-gray-600">HP: {pokemon.hp}</span>
              {element && (
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: element.color }}
                >
                  {element.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="text-gray-500">Created</span>
            <p className="font-medium text-gray-900">
              {formatDate(pokemon.created_at)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Updated</span>
            <p className="font-medium text-gray-900">
              {formatDate(pokemon.updated_at)}
            </p>
          </div>
        </div>

        {/* Abilities */}
        {pokemonAbilities.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Abilities ({pokemonAbilities.length})
            </h3>
            <div className="space-y-2">
              {pokemonAbilities.map((ability) => (
                <div key={ability.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      {ability.name}
                    </span>
                    <span
                      className={`text-sm font-medium ${getPowerColorClass(ability.power)}`}
                    >
                      {getPowerLabel(ability.power)} ({ability.power})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{ability.description}</p>
                </div>
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
        title="Delete Pokemon"
      >
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{pokemon.name}</strong>?
          {pokemonAbilities.length > 0 && (
            <span className="block mt-2 text-amber-600">
              Warning: This Pokemon has {pokemonAbilities.length} abilities that
              will also be deleted.
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
          <Button variant="danger" onClick={deletePokemon} loading={deleting}>
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
}

/**
 * Pokemon detail empty component
 */
export function PokemonDetailEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <svg
        className="w-16 h-16 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
        <line x1="2" y1="12" x2="22" y2="12" strokeWidth={1.5} />
      </svg>
      <p className="text-lg font-medium">Select a Pokemon</p>
      <p className="text-sm">Click on a Pokemon to view details</p>
    </div>
  );
}
