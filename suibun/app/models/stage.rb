class Stage < ActiveRecord::Base
  attr_accessible :name
  has_many :words

  def add_word(word_name)
    words.create(name: word_name)
  end

end
