defmodule PersonalDash.LamDataController do
  use PersonalDash.Web, :controller
  import RethinkDB.Query

  def fetch_lam_data(conn, _params) do
    IO.inspect "heh"
    lam_data = db("personal_dash") |> table("lam_data") |> PersonalDash.DB.run
    Phoenix.Controller.json conn, %{lam_data: lam_data}
  end
end
