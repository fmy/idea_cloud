class Word < ActiveRecord::Base
  attr_accessible :name, :stage_id
  belongs_to :stage
  has_many :word_connections, dependent: :destroy
  has_many :connecting_words, through: :word_connections
  has_many :word_reverse_connections, foreign_key: :connect_word_id, class_name: "WordConnection", dependent: :destroy
  has_many :connected_words, through: :word_reverse_connections

  # connectは一方通行なので両方向作る
  def connect(other_word, status = 1)
    word_connections.create(connect_word_id: other_word.id, status: status)
    other_word.word_connections.create(connect_word_id: self.id, status: status)
  end

  def connect?(other_word)
    connection = word_connections.find_by_connect_word_id(other_word.id)
  end

end
