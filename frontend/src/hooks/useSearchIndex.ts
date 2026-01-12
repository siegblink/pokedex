import { useMemo } from "react";
import { Trie } from "@lib/trie";
import type { Pokemon, Element, Ability, ActiveView } from "@appTypes/index";

type SearchResults = {
  filteredPokemon: Pokemon[];
  filteredElements: Element[];
  filteredAbilities: Ability[];
};

/**
 * Hook for Trie-based O(k) search across Pokemon, Elements, and Abilities.
 *
 * Builds separate Trie indexes for each entity type when data changes.
 * Search is performed in O(k) time where k = query length.
 */
export function useSearchIndex(
  pokemon: Pokemon[],
  elements: Element[],
  abilities: Ability[],
  searchQuery: string,
  activeView: ActiveView,
): SearchResults {
  /**
   * Build Pokemon Trie - O(n * m) where n = count, m = avg name length
   */
  const pokemonTrie = useMemo(() => {
    const trie = new Trie<Pokemon>();
    pokemon.forEach((p) => trie.insert(p.name, p));
    return trie;
  }, [pokemon]);

  /**
   * Build Elements Trie
   */
  const elementsTrie = useMemo(() => {
    const trie = new Trie<Element>();
    elements.forEach((e) => trie.insert(e.name, e));
    return trie;
  }, [elements]);

  /**
   * Build Abilities Trie
   */
  const abilitiesTrie = useMemo(() => {
    const trie = new Trie<Ability>();
    abilities.forEach((a) => trie.insert(a.name, a));
    return trie;
  }, [abilities]);

  /**
   * Perform search based on active view - O(k) lookup
   */
  const results = useMemo((): SearchResults => {
    const query = searchQuery.trim();

    /**
     * Empty query returns all items
     */
    if (!query) {
      return {
        filteredPokemon: pokemon,
        filteredElements: elements,
        filteredAbilities: abilities,
      };
    }

    /**
     * Only filter the active view's data
     */
    switch (activeView) {
      case "pokemon":
        return {
          filteredPokemon: pokemonTrie.search(query),
          filteredElements: elements,
          filteredAbilities: abilities,
        };
      case "elements":
        return {
          filteredPokemon: pokemon,
          filteredElements: elementsTrie.search(query),
          filteredAbilities: abilities,
        };
      case "abilities":
        return {
          filteredPokemon: pokemon,
          filteredElements: elements,
          filteredAbilities: abilitiesTrie.search(query),
        };
    }
  }, [
    searchQuery,
    activeView,
    pokemon,
    elements,
    abilities,
    pokemonTrie,
    elementsTrie,
    abilitiesTrie,
  ]);

  return results;
}
