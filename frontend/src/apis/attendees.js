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

export const cancelSignUp = async (authToken, eventId) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: authToken },
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/event/${eventId}/attendee`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();

      return [result];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return [`server down: ${error}`];
  }
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: authToken },
  //   body: JSON.stringify({ attendee: { event_id: eventId } }),
  // };

  // try {
  //   const response = await fetch(
  //     `${DOMAIN}${APIV1}/attendees/${attendee_id}`,
  //     requestOptions
  //   );

  //   if (response.ok) {
  //     const result = await response.json();

  //     return [result];
  //   }
  // } catch (error) {
  //   console.error("network errror: ", error);
  //   return [`server down: ${error}`];
  // }
};

export const showUserEvents = async (authToken) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: authToken },
  };

  try {
    const response = await fetch(
      `${DOMAIN}${APIV1}/user_events`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();

      return [result];
    }
  } catch (error) {
    console.error("network errror: ", error);
    return [`server down: ${error}`];
  }
};
