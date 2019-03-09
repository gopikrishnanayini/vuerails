class CreateTeachers < ActiveRecord::Migration[5.2]
  def change
    create_table :teachers do |t|
      t.string :name
      t.integer :students_count
      t.string :school

      t.timestamps
    end
  end
end
