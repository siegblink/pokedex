# Backend - Rails API

This is the Rails backend API for the Pokemon fullstack application.

## If you have Docker installed please run the following commands:

1. Build the Docker image:
   ```bash
   docker build -t app .
   ```

2. Start the Docker container:
   ```bash
   docker run -p 3000:3000 app
   ```

## Setup without Docker

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Set up the database:
   ```bash
   rails db:migrate
   rails db:seed
   ```

3. Start the server:
   ```bash
   rails server
   ```

The API will be available at `http://localhost:3000`.

## API Endpoints

- `GET /pokemons` - List all Pokemon
- `GET /pokemons/:id` - Get a specific Pokemon
- `POST /pokemons` - Create a new Pokemon
- `PUT /pokemons/:id` - Update a Pokemon
- `DELETE /pokemons/:id` - Delete a Pokemon

- `GET /elements` - List all Elements
- `GET /elements/:id` - Get a specific Element
- `POST /elements` - Create a new Element
- `PUT /elements/:id` - Update a Element
- `DELETE /elements/:id` - Delete a Element

- `GET /abilities` - List all Abilities
- `GET /abilities/:id` - Get a specific Ability
- `POST /abilities` - Create a new Ability
- `PUT /abilities/:id` - Update a Ability
- `DELETE /abilities/:id` - Delete a Ability
