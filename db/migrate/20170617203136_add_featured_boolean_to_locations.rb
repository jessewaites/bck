class AddFeaturedBooleanToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :featured, :boolean, default: false
  end
end
