class Api::TeachersController < ApplicationController
  def index
    @result = Teacher.all.order('updated_at desc')
  end
end
