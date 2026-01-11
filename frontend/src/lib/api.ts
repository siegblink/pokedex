import type {
  Pokemon,
  Element,
  Ability,
  PokemonFormData,
  ElementFormData,
  AbilityFormData,
  BaseEntity,
  ApiResource,
} from "@appTypes/index";

/**
 * The base URL for the API
 */
const API_BASE = "http://localhost:3000";

/**
 * Make a request to the API.
 * @param {string} endpoint The endpoint to request
 * @param {RequestInit} options The options for the request
 * @returns {Promise<T>}
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  // Handle 204 No Content (for DELETE)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Generic factory for creating type-safe CRUD API resources.
 * @param endpoint The endpoint to create the API resource for
 * @param resourceKey The key to use for the API resource
 * @returns {ApiResource<T, F>}
 */
function createApiResource<T extends BaseEntity, F>(
  endpoint: string,
  resourceKey: string,
): ApiResource<T, F> {
  return {
    getAll: () => request<T[]>(endpoint),
    getOne: (id) => request<T>(`${endpoint}/${id}`),
    create: (data) =>
      request<T>(endpoint, {
        method: "POST",
        body: JSON.stringify({ [resourceKey]: data }),
      }),
    update: (id, data) =>
      request<T>(`${endpoint}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ [resourceKey]: data }),
      }),
    delete: (id) => request<void>(`${endpoint}/${id}`, { method: "DELETE" }),
  };
}

/**
 * Type-safe API object using the generic factory
 */
export const api = {
  pokemon: createApiResource<Pokemon, PokemonFormData>("/pokemons", "pokemon"),
  elements: createApiResource<Element, ElementFormData>("/elements", "element"),
  abilities: createApiResource<Ability, AbilityFormData>(
    "/abilities",
    "ability",
  ),
};
