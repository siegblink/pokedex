class ElementsController < ApplicationController
  def index
    @elements = Element.all
    render json: @elements
  end

  def show
    @element = Element.find(params[:id])
    render json: @element
  end

  def create
    @element = Element.new(element_params)
    if @element.save
      render json: @element, status: :created
    else
      render json: @element.errors, status: :unprocessable_entity
    end
  end

  def update
    @element = Element.find(params[:id])
    if @element.update(element_params)
      render json: @element
    else
      render json: @element.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @element = Element.find(params[:id])
    @element.destroy
    head :no_content
  end

  private

  def element_params
    params.require(:element).permit(:name, :color)
  end
end
