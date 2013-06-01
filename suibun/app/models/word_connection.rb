class WordConnection < ActiveRecord::Base
  attr_accessible :word_id, :connect_word_id, :type
  belongs_to :connecting_words, foreign_key: :connect_word_id, class_name: "Word"
  belongs_to :connected_words, foreign_key: :word_id, class_name: "Word"
end
