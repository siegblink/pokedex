import { useMemo } from "react";
import { api } from "@lib/api";
import { useCRUD } from "@hooks/useCRUD";
import type { Pokemon, PokemonFormData } from "@appTypes/index";

/**
 * Thin wrapper around useCRUD for Pokemon entities
 */
export function usePokemon() {
  const apiResource = useMemo(() => api.pokemon, []);
  const { items, ...rest } = useCRUD<Pokemon, PokemonFormData>(
    apiResource,
    "pokemon",
  );

  return {
    pokemon: items,
    ...rest,
  };
}
