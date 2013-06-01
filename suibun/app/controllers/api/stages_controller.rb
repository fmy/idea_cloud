module Api
  class StagesController < ApplicationController
    respond_to :json

    def create
      Stage.create(name:params[:name])
    end

    def index
      respond_with Stage.find(params[:id]).to_json(:include => :words)
    end

  end
end