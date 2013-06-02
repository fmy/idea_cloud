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
      params["connections"].split(":").each do |p|
        w1, w2, st = p.split(",")
        st ||= 0
        con1  = WordConnection.where(word_id: w1, connect_word_id: w2, status: st).first_or_create
        con2 = WordConnection.where(word_id: w2, connect_word_id: w1, status: st).first_or_create
      end
      respond_with "200"
    end
  end
end