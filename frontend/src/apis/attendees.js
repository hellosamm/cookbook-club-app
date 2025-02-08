import { APIV1, DOMAIN } from "./config";

export const attendeeSignUp = async (authToken, eventId) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: authToken },
    body: JSON.stringify({ attendee: { event_id: eventId } }),
  };

  try {
    const response = await fetch(`${DOMAIN}${APIV1}/attendees`, requestOptions);

    if (response.ok) {
      const result = await response.json();

      return [result];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return [`server down: ${error}`];
  }
};
