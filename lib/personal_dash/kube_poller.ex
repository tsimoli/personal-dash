defmodule PersonalDash.KubePoller do
  use GenServer
  require Logger

  def start_link(_state, _opts \\ []) do
    GenServer.start_link(__MODULE__, [])
  end

  def init(init) do
    Process.send_after(self(), :poll, 2000)
    {:ok, init}
  end

  def handle_info(:poll, state) do
    create_url |> make_request |> parse_request |> ping_available_nodes
    Process.send_after(self(), :poll, 2000)
    {:noreply, state}
  end

  defp create_url do
    "https://" <> System.get_env("KUBERNETES_SERVICE_HOST") <> ":" <> System.get_env("KUBERNETES_SERVICE_PORT") <> "/api/v1/namespaces/default/pods"
  end

  defp make_request(url) do
    token = read_token_from_file
    HTTPoison.get url, [Authorization: "Bearer " <> token], [
      hackney: [
        ssl_options: [
          cacertfile: "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
        ]
      ]
    ]
  end

  defp read_token_from_file do
    case File.read("/var/run/secrets/kubernetes.io/serviceaccount/token") do
      {:ok, body} -> body
      {:error, reason} -> reason
    end
  end

  def parse_request({:ok, %HTTPoison.Response{status_code: 200, body: body}}) do
    Poison.decode!(body)["items"]
  end

  def parse_request(response) do
    Logger.info(response)
    Logger.error("Failed to parse response")
  end

  def ping_available_nodes(items) do
    Enum.each(items, fn item ->
      node_atom = String.to_atom(item["metadata"]["labels"]["app"] <> "@" <> item["status"]["podIP"])
      Logger.info(Atom.to_string(Node.ping(node_atom)))
    end)
  end
end
