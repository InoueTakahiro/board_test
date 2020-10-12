class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.text :name
      t.boolean :admin_flg,   default: false

      t.timestamps
    end
  end
end
