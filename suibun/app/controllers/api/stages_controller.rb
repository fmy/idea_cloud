module Api
  class StagesController < ApplicationController
    respond_to :json

    def create
      stage = Stage.create(name:params[:name])
      respond_with stage.to_json
    end

    def index
      respond_with Stage.find(params[:id])
      .to_json(only: [:id, :name], include: {words: {only: [:id, :name]}})
    end

  end
end