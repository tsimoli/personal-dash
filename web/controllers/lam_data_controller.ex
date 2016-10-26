defmodule PersonalDash.LamDataController do
  use PersonalDash.Web, :controller
  require Logger
  alias PersonalDash.KubePoller

  def fetch_lam_data(conn, _params) do
    lam_data = call_lamstate()
    Phoenix.Controller.json conn, %{lam_data: Enum.map(lam_data, fn {key, value} -> value end)}
  end

  def call_lamstate() do
    Task.Supervisor.async(PersonalDash.TaskSupervisor, fn ->
      roacher_node = Agent.get(KubePoller, fn map -> Enum.find(map, fn({key, value}) -> value == "roacher" end)end)
      GenServer.call({Roacher.LamState, elem(roacher_node, 0)}, :get)
    end) |> Task.await()
  end
end
