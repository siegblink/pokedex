import { AppProvider, useAppContext } from "@context/AppContext";
import { Navbar } from "@components/layout/Navbar";
import { TwoColumnLayout } from "@components/layout/TwoColumnLayout";

/**
 * Pokemon
 */
import { PokemonList } from "@components/pokemon/PokemonList";
import {
  PokemonDetail,
  PokemonDetailEmpty,
} from "@components/pokemon/PokemonDetail";
import { usePokemon } from "@hooks/usePokemon";

/**
 * Elements
 */
import { ElementList } from "@components/elements/ElementList";
import {
  ElementDetail,
  ElementDetailEmpty,
} from "@components/elements/ElementDetail";
import { useElements } from "@hooks/useElements";

/**
 * Abilities
 */
import { AbilityList } from "@components/abilities/AbilityList";
import {
  AbilityDetail,
  AbilityDetailEmpty,
} from "@components/abilities/AbilityDetail";
import { useAbilities } from "@hooks/useAbilities";

/**
 * App content component
 */
function AppContent() {
  const { activeView, setActiveView, selectedItem } = useAppContext();

  /**
   * Data hooks
   */
  const {
    pokemon,
    loading: pokemonLoading,
    error: pokemonError,
    update: updatePokemon,
    remove: removePokemon,
  } = usePokemon();

  const {
    elements,
    loading: elementsLoading,
    error: elementsError,
    update: updateElement,
    remove: removeElement,
  } = useElements();

  const {
    abilities,
    loading: abilitiesLoading,
    error: abilitiesError,
    update: updateAbility,
    remove: removeAbility,
  } = useAbilities();

  /**
   * Render left column based on active view
   */
  function renderLeftColumn() {
    switch (activeView) {
      case "pokemon":
        return (
          <PokemonList
            pokemon={pokemon}
            elements={elements}
            loading={pokemonLoading || elementsLoading}
            error={pokemonError || elementsError}
          />
        );
      case "elements":
        return (
          <ElementList
            elements={elements}
            loading={elementsLoading}
            error={elementsError}
          />
        );
      case "abilities":
        return (
          <AbilityList
            abilities={abilities}
            pokemon={pokemon}
            loading={abilitiesLoading || pokemonLoading}
            error={abilitiesError || pokemonError}
          />
        );
    }
  }

  /**
   * Render right column based on selected item
   */
  function renderRightColumn() {
    if (!selectedItem) {
      switch (activeView) {
        case "pokemon":
          return <PokemonDetailEmpty />;
        case "elements":
          return <ElementDetailEmpty />;
        case "abilities":
          return <AbilityDetailEmpty />;
      }
    }

    switch (selectedItem.type) {
      case "pokemon":
        return (
          <PokemonDetail
            pokemon={selectedItem.item}
            elements={elements}
            abilities={abilities}
            onUpdate={updatePokemon}
            onAbilityUpdate={updateAbility}
            onDelete={removePokemon}
          />
        );
      case "element":
        return (
          <ElementDetail
            element={selectedItem.item}
            pokemon={pokemon}
            onUpdate={updateElement}
            onDelete={removeElement}
          />
        );
      case "ability":
        return (
          <AbilityDetail
            ability={selectedItem.item}
            pokemon={pokemon}
            onUpdate={updateAbility}
            onDelete={removeAbility}
          />
        );
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      <TwoColumnLayout
        leftColumn={renderLeftColumn()}
        rightColumn={renderRightColumn()}
        stickyRightColumn
        stickyThreshold={167}
      />
    </main>
  );
}

/**
 * App component
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
