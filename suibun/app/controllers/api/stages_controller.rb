module Api
  class StagesController < ApplicationController
    respond_to :json

    def create
      stage = Stage.create(name:params[:name])
      if params["words"]
        params["words"].split(",").each { |w| stage.add_word(w) }
      end
      respond_with stage.to_json
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
          h = {first_id: c.word_id, second_word: c.connect_word_id, status: c.status}
          c_array << h
        end
      end
      hash["words"] = w_array
      hash["connections"] = c_array
      respond_with hash.to_json
    end

  end
end