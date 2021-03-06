defmodule PersonalDash.Router do
  use PersonalDash.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PersonalDash do
    pipe_through :api # Use json api

    get "/lamdata", LamDataController, :fetch_lam_data

    get "/weather", LamDataController, :fetch_weather_data
  end

  scope "/", PersonalDash do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PersonalDash do
  #   pipe_through :api
  # end
end
