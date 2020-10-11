class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :name
      t.text :mail
      t.text :title
      t.text :memo
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
