class Pokemon < ApplicationRecord
  belongs_to :element
  has_many :abilities
end
