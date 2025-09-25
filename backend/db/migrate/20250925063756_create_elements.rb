class CreateElements < ActiveRecord::Migration[7.1]
  def change
    create_table :elements do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
