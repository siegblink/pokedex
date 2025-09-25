class CreatePokemons < ActiveRecord::Migration[7.1]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :image_url
      t.integer :hp
      t.references :element, null: false, foreign_key: true

      t.timestamps
    end
  end
end
