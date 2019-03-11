class Api::TeachersController < ApplicationController
  def index
    @result = Teacher.all.order('updated_at desc')
  end

  def create
    teacher = Teacher.new(teacher_params)
    if teacher.save
      render json: { message: :success, data: teacher }, status: :created
    else
      render json: { message: teacher.errors, type: :error }, status: :unprocessable_entity
    end
  end

  def update
    teacher = Teacher.find(params[:id])
    if teacher.update_attributes(teacher_params)
      render json: { message: :success, data: teacher }, status: :ok
    else
      render json: { message: teacher.errors, type: :error }, status: :unprocessable_entity
    end
  end

  def destroy
    teacher = Teacher.find(params[:id])
    if teacher.destroy
      render json: { message: :success, data: teacher }, status: :ok
    else
      render json: { message: teacher.errors, type: :error }, status: :unprocessable_entity
    end
  end

  private

  def teacher_params
    params.require(:teacher).permit(:id, :name, :school, :students_count)
  end
end
