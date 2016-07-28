defmodule PersonalDash.LamDataController do
  use PersonalDash.Web, :controller
  require Logger
  alias PersonalDash.KubePoller

  def fetch_lam_data(conn, _params) do
    #http://elixir-lang.org/docs/stable/elixir/Task.html
    roacher_node = Agent.get(KubePoller, fn map -> Enum.find(map, fn({key, value}) -> value == "roacher" end)end)
    lam_data = GenServer.call({Roacher.LamState, elem(roacher_node, 0)}, :get)
    Phoenix.Controller.json conn, %{lam_data: Enum.map(lam_data, fn {key, value} -> value end)}
  end
end
