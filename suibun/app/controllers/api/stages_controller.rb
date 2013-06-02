module Api
  class StagesController < ApplicationController
    respond_to :json

    def create
      stage = Stage.create(name:params[:name])
      respond_with stage.to_json
      if params["words"]
        params["words"].split(",").each { |w| stage.add_word(w) }
      end
    end

    def index
      stage = Stage.includes(:words).find(params[:id])
      hash = {id: stage.id, name: stage.name}
      w_array = []
      c_array = []
      stage.words.each do |w|
        w_array << {id: w.id, name: w.name}
        connections = w.word_connections
        connections.each do |c|
          h = {first_word: c.connecting_word.name, second_word: c.connected_word.name, status: c.status}
          c_array << h
        end
      end
      hash["words"] = w_array
      hash["connections"] = c_array
      respond_with hash.to_json
    end

  end
end