/**
 * Trie Node - stores children and items matching at this prefix
 */
export class TrieNode<T> {
  children = new Map<string, TrieNode<T>>();
  items: T[] = [];
}

/**
 * Trie data structure for O(k) prefix search
 * where k = length of search query
 */
export class Trie<T> {
  private root = new TrieNode<T>();

  /**
   * Insert an item with the given key into the trie.
   * Items are stored at every prefix level for O(k) retrieval.
   * @param key - The string key to index by (e.g., Pokemon name)
   * @param item - The item to store
   * @returns {void}
   */
  insert(key: string, item: T): void {
    const normalized = key.toLowerCase().trim();
    let node = this.root;

    for (const char of normalized) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode<T>());
      }
      node = node.children.get(char)!;
      node.items.push(item);
    }
  }

  /**
   * Search for all items matching the given prefix.
   * Time complexity: O(k) where k = prefix length
   * @param prefix - The prefix to search for
   * @returns {T[]}
   */
  search(prefix: string): T[] {
    if (!prefix.trim()) return [];

    const normalized = prefix.toLowerCase().trim();
    let node = this.root;

    for (const char of normalized) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    return node.items;
  }

  /**
   * Clear the trie
   * @returns {void}
   */
  clear(): void {
    this.root = new TrieNode<T>();
  }
}
