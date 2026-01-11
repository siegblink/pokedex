/**
 * Base entity with common fields from API
 */
export type BaseEntity = {
  id: number;
  created_at: string;
  updated_at: string;
};

/**
 * Element type (Pokemon's elemental type like Fire, Water, etc.)
 */
export type Element = BaseEntity & {
  name: string;
  color: string; // hex color code e.g. "#F7D02C"
};

/**
 * Pokemon entity
 */
export type Pokemon = BaseEntity & {
  name: string;
  image_url: string;
  hp: number;
  element_id: number;
};

/**
 * Ability entity
 */
export type Ability = BaseEntity & {
  name: string;
  description: string;
  power: number;
  pokemon_id: number;
};

/**
 * Generic form data type - strips BaseEntity fields for create/update operations
 */
export type FormData<T extends BaseEntity> = Omit<T, keyof BaseEntity>;

/**
 * Concrete form data types using the generic
 */
export type PokemonFormData = FormData<Pokemon>;
export type ElementFormData = FormData<Element>;
export type AbilityFormData = FormData<Ability>;

/**
 * Ability edit state for inline editing within Pokemon form
 */
export type AbilityEditData = {
  id: number;
  name: string;
  description: string;
  power: number;
};

/**
 * Entity type map for type-safe entity lookups
 */
export type EntityMap = {
  pokemon: Pokemon;
  element: Element;
  ability: Ability;
};

/**
 * Entity type
 */
export type EntityType = keyof EntityMap;

/**
 * Generic API resource type
 */
export type ApiResource<T extends BaseEntity, F = FormData<T>> = {
  getAll: () => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  create: (data: F) => Promise<T>;
  update: (id: number, data: F) => Promise<T>;
  delete: (id: number) => Promise<void>;
};

/**
 * Generic component prop types
 */
export type ListProps<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

/**
 * Card item props
 */
export type CardItemProps<T> = {
  item: T;
  selected: boolean;
  onClick: () => void;
};

/**
 * Detail props
 */
export type DetailProps<T extends BaseEntity, F = FormData<T>> = {
  item: T;
  onUpdate: (id: number, data: F) => Promise<T>;
  onDelete: (id: number) => Promise<void>;
};

/**
 * Form component props
 */
export type FormComponentProps<T extends BaseEntity, F = FormData<T>> = {
  item: T;
  onSubmit: (data: F) => Promise<void>;
  onCancel: () => void;
};

/**
 * Navigation types
 */
export type ActiveView = "pokemon" | "elements" | "abilities";

/**
 * Selected item discriminated union
 */
export type SelectedItem =
  | { type: "pokemon"; item: Pokemon }
  | { type: "element"; item: Element }
  | { type: "ability"; item: Ability }
  | null;
