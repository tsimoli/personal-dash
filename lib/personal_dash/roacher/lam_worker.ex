defmodule Roacher.LamWorker do
  require Logger

  @name RoacherWorker
  @wsdl_url "http://tie.digitraffic.fi/sujuvuus/ws/lamData?wsdl"
  @action "LamData"
  @parameters []
  @poll_interval 60000

  #Client API

  def start_link(_state, _opts \\ []) do
    GenServer.start_link(__MODULE__, [%{}], name: __MODULE__)
  end

  def init(init) do
    Process.send_after(self(), :fetch, 1000)
    {:ok, init}
  end

  #API
  def get_lam_data() do
    GenServer.call(__MODULE__, :get_lam_data)
  end

  #Server Callbacks

  def handle_info(:fetch, state) do
    response = Detergentex.call(@wsdl_url, @action, @parameters)
    new_state =
      elem(response, 2)
      |> List.first
      |> elem(4)
      |> elem(2)
      |> Enum.filter(&(is_on_workroute(&1)))
      |> Enum.map(&(transform_data(&1)))

    Process.send_after(self(), :fetch, @poll_interval)
    {:noreply, new_state}
  end

  def handle_call(:get_lam_data,_from, state) do
    {:reply, state, state}
  end

  # Functions

  defp is_on_workroute(lam_data) do
    lam_data_map = transform_to_map(lam_data)
    work_route = [192,191,139,175,144,104]
    Enum.member?(work_route, lam_data_map[:lam_id])
  end

  defp transform_data(lam_data) do
    lam_data_map = transform_to_map(lam_data)
    map_location_to_lam_data(lam_data_map)
  end

  defp map_location_to_lam_data(lam_data) do
    lam_location = case lam_data[:lam_id] do
      192 -> "Veikkola"
      191 -> "Kolmiranta"
      139 -> "Nupuri"
      175 -> "Lommila"
      144 -> "Friisinmäki"
      104 -> "Palojärvi"
    end
    Map.put(lam_data, :location_name, lam_location)
  end

  defp transform_to_map(lam_data) do
    lam_data_time_tuple = elem(lam_data, 3)
    %{
      lam_id: String.to_integer(to_string elem(lam_data, 2)),
      measurement_time: to_string(elem(lam_data_time_tuple, 3)),
      traffic_volume1: String. to_integer(to_string elem(lam_data, 4)),
      traffic_volume2: String.to_integer(to_string elem(lam_data, 5)),
      average_speed1: String.to_integer(to_string elem(lam_data, 6)),
      average_speed2: String.to_integer(to_string elem(lam_data, 7))
    }
  end
end
