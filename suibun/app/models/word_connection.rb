class WordConnection < ActiveRecord::Base
  attr_accessible :word_id, :connect_word_id, :status
  belongs_to :connecting_word, foreign_key: :connect_word_id, class_name: "Word"
  belongs_to :connected_word, foreign_key: :word_id, class_name: "Word"
end
