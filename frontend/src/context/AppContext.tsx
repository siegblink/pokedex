import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ActiveView, SelectedItem } from "@appTypes/index";

/**
 * App Context type
 */
type AppContextType = {
  // Navigation state
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // Selection state
  selectedItem: SelectedItem;
  selectItem: (item: SelectedItem) => void;
  clearSelection: () => void;

  // Edit state
  isEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
};

/**
 * App Context
 */
const AppContext = createContext<AppContextType | null>(null);

/**
 * App Provider props
 */
type AppProviderProps = {
  children: ReactNode;
};

/**
 * App Provider component
 */
export function AppProvider({ children }: AppProviderProps) {
  const [activeView, setActiveViewState] = useState<ActiveView>("pokemon");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Set the active view.
   * @param {ActiveView} view The active view
   * @returns {void}
   */
  const setActiveView = useCallback((view: ActiveView) => {
    setActiveViewState(view);
    // Clear selection when switching views
    setSelectedItem(null);
    setIsEditing(false);
  }, []);

  /**
   * Select an item.
   * @param {SelectedItem} item The selected item
   * @returns {void}
   */
  const selectItem = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    setIsEditing(false);
  }, []);

  /**
   * Clear the selection.
   * @returns {void}
   */
  const clearSelection = useCallback(() => {
    setSelectedItem(null);
    setIsEditing(false);
  }, []);

  /**
   * Start editing.
   * @returns {void}
   */
  const startEditing = useCallback(() => {
    if (selectedItem) {
      setIsEditing(true);
    }
  }, [selectedItem]);

  /**
   * Stop editing.
   * @returns {void}
   */
  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const value: AppContextType = {
    activeView,
    setActiveView,
    selectedItem,
    selectItem,
    clearSelection,
    isEditing,
    startEditing,
    stopEditing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * App Context custom hook.
 * We have to disable the react-refresh/only-export-components rule
 * because the co-location of `AppProvider` and `useAppContext` is intentional,
 * they're tightly coupled and keeping them together improves maintainability.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
