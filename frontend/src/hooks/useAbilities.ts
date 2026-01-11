import { useMemo } from "react";
import { api } from "@lib/api";
import { useCRUD } from "@hooks/useCRUD";
import type { Ability, AbilityFormData } from "@appTypes/index";

/**
 * Thin wrapper around useCRUD for Ability entities
 */
export function useAbilities() {
  const apiResource = useMemo(() => api.abilities, []);
  const { items, ...rest } = useCRUD<Ability, AbilityFormData>(
    apiResource,
    "abilities",
  );

  return {
    abilities: items,
    ...rest,
  };
}
