class Location < ActiveRecord::Base
  has_many :posts
  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }

  extend FriendlyId
  friendly_id :address, use: [ :slugged, :history, :finders ]


end
