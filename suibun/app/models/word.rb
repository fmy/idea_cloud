class Word < ActiveRecord::Base
  attr_accessible :name, :stage_id
  belongs_to :stage
  has_many :word_connections, dependent: :destroy
  has_many :connecting_words, through: :word_connections
  has_many :word_reverse_connections, foreign_key: :connect_word_id, class_name: "WordConnection", dependent: :destroy
  has_many :connected_words, through: :word_reverse_connections


  def connect(other_word)
    word_connections.create(connect_word_id: other_word.id)
  end

  def connect_words
    connecting_words | connected_words
  end

end
