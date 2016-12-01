defmodule Roacher.WeatherWorker do
  require Logger
  use GenServer
  alias Roacher.Weather

  @weather_url "https://api.forecast.io/forecast/b0b098552a7e1fac5bdcb4e1615f58b2/60.33391,24.32064?units=si"

  #Client API

  def start_link(_state, _opts \\ []) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(init) do
    Process.send_after(self(), :fetch, 1000)
    {:ok, init}
  end

  #API

  def get_weather() do
    GenServer.call(__MODULE__, :get_weather_data)
  end

  #Server Callbacks

  def handle_call(:get_weather_data, _from, state) do
    {:reply, state, state}
  end

  def handle_info(:fetch, state) do
    HTTPoison.start
    new_weather = HTTPoison.get(@weather_url)
    |> process_reply

    Process.send_after(self(), :fetch, 180000)
    {:noreply, new_weather}
  end

  def process_reply({:ok, %HTTPoison.Response{status_code: 200, body: body}}) do
    json_response = Poison.decode!(body)
    %{"currently" => current, "daily" => daily} = json_response
    # first daily is today so take only last 6 days
    %Weather{current: current, daily: Enum.take(tl(daily["data"]), 6)}
  end

  def process_reply(response) do
    Logger.info(response)
    Logger.info("Failed to get proper response from weather API")
  end
end
