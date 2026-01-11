import { useMemo } from "react";
import { api } from "@lib/api";
import { useCRUD } from "@hooks/useCRUD";
import type { Element, ElementFormData } from "@appTypes/index";

/**
 * Thin wrapper around useCRUD for Element entities
 */
export function useElements() {
  const apiResource = useMemo(() => api.elements, []);
  const { items, ...rest } = useCRUD<Element, ElementFormData>(
    apiResource,
    "elements",
  );

  return {
    elements: items,
    ...rest,
  };
}
