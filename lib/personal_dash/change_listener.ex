defmodule PersonalDash.ChangeListener do
  require Logger
  import RethinkDB.Query

  def start_listening(table) do
    fn -> Logger.debug "Started listening for changes"
      results =
        db("personal_dash")
        |> table(table)
        |> changes
        |> PersonalDash.DB.run

      results |> Enum.each(fn(item) -> broadcastItem(item, table) end)
    end
  end

  def broadcastItem(item, table) do
      PersonalDash.Endpoint.broadcast ! "personal_dash", table, item
  end
end
