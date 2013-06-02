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

    def create_connections
      params["connections"].split("|").each do |c|
        w1, w2, st = c.split(",")
        WordConnection.create(w1, w2, st)
        WordConnection.create(w2, w1, st)
      end

    end
  end
end