defmodule PersonalDash do
  use Application
  require Logger
  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      # Start the endpoint when the application starts
      supervisor(PersonalDash.Endpoint, []),
      supervisor(Task.Supervisor, [[name: PersonalDash.TaskSupervisor]]),
      worker(Roacher.LamWorker, [[]]),
      worker(Roacher.WeatherWorker, [[]])
      # worker(PersonalDash.Worker, [arg1, arg2, arg3]),
    ]

    # kube_poller = case System.get_env("KUBERNETES_SERVICE_HOST") do
    #                 nil -> []
    #                 _ -> [worker(PersonalDash.KubePoller, [[]])]
    #               end

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PersonalDash.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PersonalDash.Endpoint.config_change(changed, removed)
    :ok
  end
end
