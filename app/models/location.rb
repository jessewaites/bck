class Location < ActiveRecord::Base
  belongs_to :post
  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
end
