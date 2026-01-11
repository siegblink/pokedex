import { useState, useEffect, useCallback } from "react";
import type { BaseEntity, ApiResource } from "@appTypes/index";

/**
 * Generic state shape for CRUD operations
 */
type CRUDState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

/**
 * Generic actions for CRUD operations
 */
type CRUDActions<T, F> = {
  refetch: () => Promise<void>;
  create: (data: F) => Promise<T>;
  update: (id: number, data: F) => Promise<T>;
  remove: (id: number) => Promise<void>;
};

/**
 * Combined return type
 */
export type UseCRUDResult<T, F> = CRUDState<T> & CRUDActions<T, F>;

/**
 * Generic CRUD hook that works with any entity type.
 * @param {ApiResource<T, F>} apiResource The API resource to use
 * @param {string} entityName The name of the entity
 * @returns {UseCRUDResult<T, F>}
 */
export function useCRUD<T extends BaseEntity, F>(
  apiResource: ApiResource<T, F>,
  entityName: string,
): UseCRUDResult<T, F> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch items from the API.
   * @returns {void}
   */
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiResource.getAll();
      setItems(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Failed to fetch ${entityName}`,
      );
    } finally {
      setLoading(false);
    }
  }, [apiResource, entityName]);

  /**
   * Fetch items from the API when the component mounts.
   * Should be called again when `fetchItems` reference changes.
   */
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /**
   * Create a new item in the API.
   * @param {F} data The data to create the item with
   * @returns {Promise<T>}
   */
  const createItem = useCallback(
    async (data: F) => {
      const newItem = await apiResource.create(data);
      setItems((prev) => [...prev, newItem]);
      return newItem;
    },
    [apiResource],
  );

  /**
   * Update an item in the API.
   * @param {number} id The id of the item to update
   * @param {F} data The data to update the item with
   * @returns {Promise<T>}
   */
  const updateItem = useCallback(
    async (id: number, data: F) => {
      const updated = await apiResource.update(id, data);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return updated;
    },
    [apiResource],
  );

  /**
   * Delete an item in the API.
   * @param {number} id The id of the item delete
   * @returns {Promise<void>}
   */
  const deleteItem = useCallback(
    async (id: number) => {
      await apiResource.delete(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [apiResource],
  );

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    create: createItem,
    update: updateItem,
    remove: deleteItem,
  };
}
