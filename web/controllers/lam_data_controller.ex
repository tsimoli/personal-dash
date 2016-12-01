defmodule PersonalDash.LamDataController do
  use PersonalDash.Web, :controller
  require Logger
  alias PersonalDash.KubePoller

  def fetch_lam_data(conn, _params) do
    Phoenix.Controller.json conn, %{lam_data: Roacher.LamWorker.get_lam_data}
  end

  def fetch_weather_data(conn, _params) do
    Phoenix.Controller.json conn, %{weather: Roacher.WeatherWorker.get_weather}
  end
end
