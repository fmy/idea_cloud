class Stage < ActiveRecord::Base
  attr_accessible :name
  has_many :words
end
