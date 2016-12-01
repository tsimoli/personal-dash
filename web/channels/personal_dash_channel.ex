defmodule PersonalDash.PersonalDashChannel do
  use PersonalDash.Web, :channel
  require Logger

  def join("personal_dash:stream", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (visual_web:stream).
  def handle_in("events", payload, socket) do
    broadcast socket, "events", payload

    {:noreply, socket}
  end
  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end
end
