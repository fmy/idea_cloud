module Api
  class WordsController < ApplicationController

    respond_to :json

    def create
    end

    def connection
      respond_with Word.find(params[:id]).word_connections
      .to_json(only: :status, include: {connecting_word: {only: [:id, :name]}})
    end
  end
end