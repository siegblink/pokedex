# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Seed Elements
elements_data = [
  { name: "Electric", color: "#F7D02C" },
  { name: "Fire", color: "#EE8130" },
  { name: "Flying", color: "#A98FF3" },
  { name: "Grass", color: "#7AC74C" },
  { name: "Poison", color: "#A33EA1" },
  { name: "Water", color: "#6390F0" },
  { name: "Normal", color: "#A8A77A" },
  { name: "Psychic", color: "#F95587" },
  { name: "Ghost", color: "#735797" },
  { name: "Dragon", color: "#6F35FC" },
  { name: "Fighting", color: "#C22E28" },
  { name: "Steel", color: "#B7B7CE" },
]
elements_data.each do |data|
  Element.find_or_create_by!(name: data[:name], color: data[:color])
end

# Seed Pokémon and their abilities
pokemons_data = [
  {
    name: "Pikachu",
    type: "Electric",
    hp: 35,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    abilities: [
      { name: "Static", description: "Prevents paralysis.", power: 20 },
      { name: "Lightning Rod", description: "Draws in Electric moves.", power: 15 },
    ],
  },
  {
    name: "Charizard",
    type: "Fire/Flying",
    hp: 78,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    abilities: [
      { name: "Blaze", description: "Powers up Fire-type moves in a pinch.", power: 25 },
      { name: "Solar Power", description: "Boosts Special Attack but lowers HP in sunshine.", power: 30 },
    ],
  },
  {
    name: "Bulbasaur",
    type: "Grass/Poison",
    hp: 45,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    abilities: [
      { name: "Overgrow", description: "Powers up Grass-type moves in a pinch.", power: 20 },
      { name: "Chlorophyll", description: "Boosts Speed in sunshine.", power: 15 },
    ],
  },
  {
    name: "Squirtle",
    type: "Water",
    hp: 44,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    abilities: [
      { name: "Torrent", description: "Powers up Water-type moves in a pinch.", power: 20 },
      { name: "Rain Dish", description: "Slowly restores HP in rain.", power: 10 },
    ],
  },
  {
    name: "Eevee",
    type: "Normal",
    hp: 55,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
    abilities: [
      { name: "Run Away", description: "Makes it easier to escape from wild Pokémon.", power: 5 },
      { name: "Adaptability", description: "Powers up moves of the same type.", power: 15 },
    ],
  },
  {
    name: "Mewtwo",
    type: "Psychic",
    hp: 106,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    abilities: [
      { name: "Pressure", description: "Raises foe's PP usage.", power: 30 },
      { name: "Unnerve", description: "Prevents foes from eating Berries.", power: 25 },
    ],
  },
  {
    name: "Gengar",
    type: "Ghost/Poison",
    hp: 60,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    abilities: [
      { name: "Cursed Body", description: "May disable a move used on the Pokémon.", power: 20 },
      { name: "Levitate", description: "Gives immunity to Ground-type moves.", power: 15 },
    ],
  },
  {
    name: "Dragonite",
    type: "Dragon/Flying",
    hp: 91,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    abilities: [
      { name: "Inner Focus", description: "Prevents flinching.", power: 10 },
      { name: "Multiscale", description: "Halves damage when HP is full.", power: 40 },
    ],
  },
  {
    name: "Lucario",
    type: "Fighting/Steel",
    hp: 70,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png",
    abilities: [
      { name: "Steadfast", description: "Raises Speed when flinching.", power: 15 },
      { name: "Inner Focus", description: "Prevents flinching.", power: 10 },
    ],
  },
  {
    name: "Snorlax",
    type: "Normal",
    hp: 160,
    image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
    abilities: [
      { name: "Immunity", description: "Prevents poisoning.", power: 20 },
      { name: "Thick Fat", description: "Reduces damage from Fire- and Ice-type moves.", power: 25 },
    ],
  },
]

pokemons_data.each do |data|
  element_name = data[:type].split("/").first
  element = Element.find_by(name: element_name)
  pokemon = Pokemon.find_or_create_by!(
    name: data[:name],
    image_url: data[:image_url],
    element: element,
    hp: data[:hp]
  )
  data[:abilities].each do |ability_data|
    Ability.find_or_create_by!(
      name: ability_data[:name],
      description: ability_data[:description],
      power: ability_data[:power],
      pokemon: pokemon
    )
  end
end
