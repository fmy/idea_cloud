module Api
  class WordsController < ApplicationController

    respond_to :json

    def create
    end

    def connection
      a = []
      connections = Word.find(params[:id]).word_connections
      connections.map do |c|
        h = c.connecting_word.to_hash
        h["status"] = c.status
        a << h
      end
      respond_with a
    end

  end
end