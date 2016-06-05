defmodule PersonalDash.PageController do
  use PersonalDash.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
