module Api
  class PullController < ApplicationController
    respond_to :json

    def do
      Pull.pull_and_restart
      respond_with({"result" => "true"}.to_json)
    end
  end
end

