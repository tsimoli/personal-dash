defmodule PersonalDash do
  use Application
  require Logger
  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Start the endpoint when the application starts
      supervisor(PersonalDash.Endpoint, [])
      #worker(PersonalDash.DB, []),
      #worker(Task, [PersonalDash.ChangeListener.start_listening("lam_data")], [restart: :transient, id: "lam_data_listener"]),
      #worker(Task, [PersonalDash.ChangeListener.start_listening("weather_data")], [restart: :transient, id: "weather_data_listener"])
      # Here you could define other workers and supervissudo apt-get install -y nodejsors as children
      # worker(PersonalDash.Worker, [arg1, arg2, arg3]),
    ]

    kube_poller = case System.get_env("KUBERNETES_SERVICE_HOST") do
                    nil -> []
                    _ -> [worker(PersonalDash.KubePoller, [[]])]
                  end

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PersonalDash.Supervisor]
    Supervisor.start_link(children ++ kube_poller, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PersonalDash.Endpoint.config_change(changed, removed)
    :ok
  end
end
